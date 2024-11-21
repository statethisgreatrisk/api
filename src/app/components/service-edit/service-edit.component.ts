import { Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInjectorService } from '../../services/component-injector.service';
import { AppStateInit, View } from '../../store/interfaces/app.interface';
import { EditApiComponent } from '../edit-api/edit-api.component';
import { EditStorageComponent } from '../edit-storage/edit-storage.component';
import { EditValidatorComponent } from '../edit-validator/edit-validator.component';
import { Store } from '@ngrx/store';
import { NgIf, NgStyle } from '@angular/common';
import { EditSchemaComponent } from '../edit-schema/edit-schema.component';
import { selectView } from '../../store/selectors/app.selector';
import { EditFnComponent } from '../edit-fn/edit-fn.component';
import { EditObjComponent } from '../edit-obj/edit-obj.component';
import { EditWorkflowComponent } from '../edit-workflow/edit-workflow.component';
import { EditRequestComponent } from '../edit-request/edit-request.component';
import { EditVariableComponent } from '../edit-variable/edit-variable.component';
import { EditWebsocketComponent } from '../edit-websocket/edit-websocket.component';
import { EditQueueComponent } from '../edit-queue/edit-queue.component';
import { EditSchedulerComponent } from '../edit-scheduler/edit-scheduler.component';
import { EditArrComponent } from '../edit-arr/edit-arr.component';
import { ResizableWidthDirective } from '../../directives/resizable-width.directive';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [NgIf, NgStyle, ResizableWidthDirective],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.scss'
})
export class ServiceEditComponent {
  view: View = { service: '', serviceId: '', window: '', windowId: '' };

  @ViewChild('serviceEditContainer') serviceEditContainer!: ElementRef;
  
  @ViewChild('componentHost', { read: ViewContainerRef, static: true }) componentHost!: ViewContainerRef;
  componentHostRef: ComponentRef<EditApiComponent | EditStorageComponent | EditValidatorComponent | EditSchemaComponent | EditFnComponent | EditObjComponent | EditArrComponent | EditRequestComponent | EditVariableComponent | EditWebsocketComponent | EditQueueComponent | EditSchedulerComponent | EditWorkflowComponent> | null = null;

  serviceEditWidth: string = localStorage.getItem('serviceEditWidth') || '400';
  
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
    } else if (this.view.service === 'Arrays') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditArrComponent, { injector: componentInjector });
    } else if (this.view.service === 'Requests') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditRequestComponent, { injector: componentInjector });
    } else if (this.view.service === 'Variables') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditVariableComponent, { injector: componentInjector });
    } else if (this.view.service === 'WebSockets') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditWebsocketComponent, { injector: componentInjector });
    } else if (this.view.service === 'Queues') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditQueueComponent, { injector: componentInjector });
    } else if (this.view.service === 'Schedulers') {
      const componentInjector = this.componentInjector.createServiceEditInjector();
      this.componentHostRef = this.componentHost.createComponent(EditSchedulerComponent, { injector: componentInjector });
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
