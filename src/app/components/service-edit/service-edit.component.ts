import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInjectorService } from '../../services/component-injector.service';
import { AppStateInit, View } from '../../store/interfaces/app.interface';
import { EditApiComponent } from '../edit-api/edit-api.component';
import { EditStorageComponent } from '../edit-storage/edit-storage.component';
import { EditValidatorComponent } from '../edit-validator/edit-validator.component';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { EditSchemaComponent } from '../edit-schema/edit-schema.component';
import { selectView } from '../../store/selectors/app.selector';
import { EditFnComponent } from '../edit-fn/edit-fn.component';
import { EditObjComponent } from '../edit-obj/edit-obj.component';
import { EditWorkflowComponent } from '../edit-workflow/edit-workflow.component';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.scss'
})
export class ServiceEditComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  
  @ViewChild('componentHost', { read: ViewContainerRef, static: true }) componentHost!: ViewContainerRef;
  componentHostRef: ComponentRef<EditApiComponent | EditStorageComponent | EditValidatorComponent | EditSchemaComponent | EditFnComponent | EditObjComponent | EditWorkflowComponent> | null = null;
  
  constructor(
    private store: Store<AppStateInit>,
    private componentInjector: ComponentInjectorService,
  ) {}

  ngOnInit() {
    this.initView();
  }

  initView() {
    this.store.select(selectView).subscribe((view) => {
      if (!view) return;

      if (!view.service && !view.serviceId) {
        if (view.service !== this.view.service || view.serviceId !== this.view.serviceId) {
          this.view = view;
          this.closeComponent();
        }
      } else if (view.service && !view.serviceId) {
        if (view.service !== this.view.service || view.serviceId !== this.view.serviceId) {
          this.view = view;
          this.closeComponent();
        }
      } else {
        if (view.service !== this.view.service || view.serviceId !== this.view.serviceId) {
          this.view = view;
          this.closeComponent();
          this.createComponent();
        }
      }
    });
  }

  createComponent() {
    if (this.view.service === 'APIs') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditApiComponent, { injector: componentInjector });
    } else if (this.view.service === 'Storages') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditStorageComponent, { injector: componentInjector });
    } else if (this.view.service === 'Validators') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditValidatorComponent, { injector: componentInjector });
    } else if (this.view.service === 'Schemas') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditSchemaComponent, { injector: componentInjector });
    } else if (this.view.service === 'Functions') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditFnComponent, { injector: componentInjector });
    } else if (this.view.service === 'Objects') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditObjComponent, { injector: componentInjector });
    } else if (this.view.service === 'Workflows') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditWorkflowComponent, { injector: componentInjector });
    }
  }

  closeComponent() {
    if (this.componentHost) this.componentHost.clear();
    if (this.componentHostRef) this.componentHostRef.destroy();
  }
}
