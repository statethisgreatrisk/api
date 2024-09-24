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
  componentHostRef: ComponentRef<EditApiComponent | EditStorageComponent | EditValidatorComponent | EditSchemaComponent> | null = null;
  
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
    }
  }

  closeComponent() {
    if (this.componentHost) this.componentHost.clear();
    if (this.componentHostRef) this.componentHostRef.destroy();
  }
}
