import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInjectorService } from '../../services/component-injector.service';
import { AppStateInit, View } from '../../store/interfaces/app.interface';
import { EditApiComponent } from '../edit-api/edit-api.component';
import { EditStorageComponent } from '../edit-storage/edit-storage.component';
import { EditValidatorComponent } from '../edit-validator/edit-validator.component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';
import { EditSchemaComponent } from '../edit-schema/edit-schema.component';
import { EditWorkflowComponent } from '../edit-workflow/edit-workflow.component';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.scss'
})
export class ServiceEditComponent {
  view: View = { service: '', serviceDataId: '', window: '', windowId: '' };
  
  @ViewChild('componentHost', { read: ViewContainerRef, static: true }) componentHost!: ViewContainerRef;
  componentHostRef: ComponentRef<EditApiComponent | EditStorageComponent | EditValidatorComponent | EditSchemaComponent | EditWorkflowComponent> | null = null;
  
  constructor(
    private store: Store<AppStateInit>,
    private componentInjector: ComponentInjectorService,
  ) {}

  ngOnInit() {
    this.initView();
  }

  initView() {
    this.store.pipe(map((store) => store.app.view)).subscribe((view) => {
      if (!view) return;

      if (!view.service && !view.serviceDataId) {
        if (view.service !== this.view.service || view.serviceDataId !== this.view.serviceDataId) {
          this.view = view;
          this.closeComponent();
        }
      } else if (view.service && !view.serviceDataId) {
        if (view.service !== this.view.service || view.serviceDataId !== this.view.serviceDataId) {
          this.view = view;
          this.closeComponent();
        }
      } else {
        if (view.service !== this.view.service || view.serviceDataId !== this.view.serviceDataId) {
          this.view = view;
          this.closeComponent();
          this.createComponent();
        }
      }
    });
  }

  createComponent() {
    if (this.view.service === 'API') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditApiComponent, { injector: componentInjector });
    } else if (this.view.service === 'Storage') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditStorageComponent, { injector: componentInjector });
    } else if (this.view.service === 'Validator') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditValidatorComponent, { injector: componentInjector });
    } else if (this.view.service === 'Schema') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditSchemaComponent, { injector: componentInjector });
    } else if (this.view.service === 'Workflow') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditWorkflowComponent, { injector: componentInjector });
    }
  }

  closeComponent() {
    if (this.componentHost) this.componentHost.clear();
    if (this.componentHostRef) this.componentHostRef.destroy();
  }
}
