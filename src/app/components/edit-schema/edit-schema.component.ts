import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, Schema, User, View } from '../../store/interfaces/app.interface';
import { selectSchemas, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { deleteSchema, deselectService, updateSchema } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';
import ObjectId from 'bson-objectid';
import { ZodTypeaheadService } from '../../services/zod-typeahead.service';

@Component({
  selector: 'app-edit-schema',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-schema.component.html',
  styleUrl: './edit-schema.component.scss'
})
export class EditSchemaComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  schema: Schema | null = null;

  sub: Subscription | null = null;

  prefixDropdown = false;

  @ViewChildren('rowKeyInputs') rowKeyInputs!: QueryList<ElementRef>;
  @ViewChildren('rowTypeInputs') rowTypeInputs!: QueryList<ElementRef>;
  @ViewChildren('rowKeySpans') rowKeySpans!: QueryList<ElementRef>;
  @ViewChildren('rowTypeSpans') rowTypeSpans!: QueryList<ElementRef>;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private zodTypeaheadService: ZodTypeaheadService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.adjustAllInputs();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectSchemas),
    ]).subscribe(([user, view, schemas]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceId) {
        const schema = schemas.find((existingSchema) => existingSchema._id === this.view.serviceId);
        this.schema = schema ? { ...schema } : null;
        
        if (this.schema && this.schema.rows) this.schema.rows = [...this.schema.rows];
        if (this.schema && this.schema.rows) this.schema.rows = this.schema.rows.map((row) => {
          let mutableRow = { ...row };

          mutableRow.placeholder = '';
          mutableRow.placeholderIndex = -1;
          return mutableRow;
        });

        this.adjustAllInputs();
      }
    });
  }

  addRow() {
    if (!this.schema) return;

    this.schema.rows.push({ _id: ObjectId().toHexString(), key: '', type: '' });
  }

  removeRow(_id: string) {
    if (!this.schema) return;
    if (this.schema.rows.length === 1) return;

    this.schema.rows = this.schema.rows.filter((row) => row._id !== _id);
  }

  adjustAllInputs() {
    if (!this.schema || !this.schema.rows) return;

    Array.from({ length: this.schema.rows.length }).forEach((_, index) => {
      this.adjustKeyWidth(index);
      this.adjustTypeWidth(index);
    });
  }

  adjustKeyWidth(index: number) {
    this.cdr.detectChanges();

    const inputElement = this.rowKeyInputs.toArray()[index].nativeElement;
    const spanElement = this.rowKeySpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 27 : spanElement.offsetWidth + 1;
  
    inputElement.style.width = `${width}px`;
  }
  
  adjustTypeWidth(index: number) {
    this.cdr.detectChanges();

    const inputElement = this.rowTypeInputs.toArray()[index].nativeElement;
    const spanElement = this.rowTypeSpans.toArray()[index].nativeElement;
    const width = spanElement.offsetWidth === 0 ? 33 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  typeahead(event: KeyboardEvent, index: number) {
    if (!this.schema || !this.schema.rows.length) return;

    if (event.key === 'Tab') {
      event.preventDefault();
      this.zodTypeaheadService.complete(this.schema, index);
      this.adjustTypeWidth(index);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      return this.zodTypeaheadService.determine(this.schema, index);
    }

    this.schema.rows[index].placeholder = '';
    this.schema.rows[index].placeholderIndex = -1;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.schema) return;

    let schema = { ...this.schema };
    schema.rows = schema.rows.map((row) => {
      delete row.placeholder;
      delete row.placeholderIndex;
      return row;
    });

    this.store.dispatch(updateSchema({ schema: schema }));
  }

  delete() {
    if (!this.schema) return;

    const schema = { ...this.schema};
    schema.rows = schema.rows.map((row) => {
      delete row.placeholder;
      delete row.placeholderIndex;
      return row;
    });

    this.deleteService.initDelete({
      service: this.view.service,
      serviceData: schema,
      deleteFn: () => {
        this.store.dispatch(deleteSchema({ schemaId: schema._id }));
        this.cancel();
      },
    });
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }
}
