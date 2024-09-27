import { NgIf, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateInit, User, Validator, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { selectUser, selectValidators, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { deleteValidator, deselectService, updateValidator } from '../../store/actions/app.action';
import { CapitalizePipe } from '../../services/capitalize.pipe';
import { DeleteService } from '../../services/delete.service';
import { ValidatorTypeaheadService } from '../../services/validator-typeahead.service';

@Component({
  selector: 'app-edit-validator',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, CapitalizePipe],
  templateUrl: './edit-validator.component.html',
  styleUrl: './edit-validator.component.scss'
})
export class EditValidatorComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  validator: Validator | null = null;

  sub: Subscription | null = null;

  prefixDropdown = false;

  @ViewChild('validationInput') validationInput!: ElementRef;
  @ViewChild('validationSpan') validationSpan!: ElementRef;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private validatorTypeaheadService: ValidatorTypeaheadService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.adjustValidationWidth();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectValidators),
    ]).subscribe(([user, view, validators]) => {
      this.user = user;
      this.view = view;

      if (this.user && this.view && this.view.serviceId) {
        const validator = validators.find((existingValidator) => existingValidator._id === this.view.serviceId);
        this.validator = validator ? { ...validator } : null;
        
        if (this.validator) {
          this.validator.placeholder = '';
          this.validator.placeholderIndex = -1;
        }
      }
    });
  }

  selectField(field: Validator['field']) {
    if (!this.validator) return;
    this.validator.field = field;
  }

  adjustValidationWidth() {
    this.cdr.detectChanges();

    const inputElement = this.validationInput.nativeElement;
    const spanElement = this.validationSpan.nativeElement;
    const width = spanElement.offsetWidth === 0 ? 61 : spanElement.offsetWidth + 1;

    inputElement.style.width = `${width}px`;  
  }

  typeahead(event: KeyboardEvent) {
    if (!this.validator) return;

    if (event.key === 'Tab') {
      event.preventDefault();
      this.validatorTypeaheadService.complete(this.validator);
      this.adjustValidationWidth();
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      return this.validatorTypeaheadService.determine(this.validator);
    }

    this.validator.placeholder = '';
    this.validator.placeholderIndex = -1;
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.validator) return;

    const validator = { ...this.validator} ;
    delete validator.placeholder;
    delete validator.placeholderIndex;

    this.store.dispatch(updateValidator({ validator: validator }));
  }

  delete() {
    if (!this.validator) return;

    const validator = { ...this.validator };

    this.deleteService.initDelete({
      service: this.view.service,
      serviceData: validator,
      deleteFn: () => {
        this.store.dispatch(deleteValidator({ validatorId: validator._id }));
        this.cancel();
      },
    });
  }

  togglePrefixDropdown() {
    this.prefixDropdown = !this.prefixDropdown;
  }
}
