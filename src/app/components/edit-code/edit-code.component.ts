import { Component } from '@angular/core';
import { API, AppStateInit, Code, CodeVersion, Project, User, View } from '../../store/interfaces/app.interface';
import { combineLatest, Subscription } from 'rxjs';
import { selectAPIs, selectCodes, selectMainProject, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { DeleteService } from '../../services/delete.service';
import { deleteCode, deselectService, updateCode } from '../../store/actions/app.action';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-code',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-code.component.html',
  styleUrl: './edit-code.component.scss'
})
export class EditCodeComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  code: Code | null = null;
  project: Project | null = null;

  versions: CodeVersion[] = [];

  sub: Subscription | null = null;

  apis: API[] = [];

  dropdown = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
  ) {}

  ngOnInit() {
    this.initLatest();
    this.initAPIs();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectCodes),
    ]).subscribe(([user, view, project, codes]) => {
      this.user = user;
      this.view = view;
      this.project = project;

      if (this.user && this.view && this.view.serviceId) {
        const code = codes.find((existingCode) => existingCode._id === this.view.serviceId);
        this.code = code ? cloneDeep(code) : null;

        if (!this.code) return;
        this.versions = cloneDeep(this.code.versions).reverse();
      }
    });
  }

  initAPIs() {
    this.store.select(selectAPIs).subscribe((apis) => {
      this.apis = apis;
    });
  }

  cancel() {
    this.store.dispatch(deselectService({ serviceName: this.view.service, serviceId: this.view.serviceId }));
  }

  save() {
    if (!this.project) return;
    if (!this.code) return;
    this.store.dispatch(updateCode({ projectId: this.project._id, code: this.code }));
  }

  delete() {
    if (!this.project) return;
    if (!this.code) return;

    const code = this.code;

    this.deleteService.initDelete({
      service: this.view.service.slice(0, this.view.service.length - 1),
      serviceData: code,
      deleteFn: () => {
        this.store.dispatch(deleteCode({ projectId: this.project!._id, codeId: code._id }));
        this.cancel();
      },
    });
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  selectVersion(version: CodeVersion) {
    if (!this.code) return;

    this.toggleDropdown();
    this.code.versionId = version._id;
  }

  findVersion(versionId: string) {
    if (!this.code) return;

    return this.code.versions.find((version) => version._id === versionId);
  }
}
