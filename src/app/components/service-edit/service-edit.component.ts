import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentInjectorService } from '../../services/component-injector.service';
import { EditApiComponent } from '../edit-api/edit-api.component';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.scss'
})
export class ServiceEditComponent {
  @ViewChild('componentHost', { read: ViewContainerRef, static: true }) componentHost!: ViewContainerRef;
  componentHostRef: ComponentRef<EditApiComponent> | null = null;
  
  constructor(
    private componentInjector: ComponentInjectorService,
  ) {}

  ngOnInit() {
    this.createComponent();
  }

  createComponent() {
    this.closeComponent();

    const componentInjector = this.componentInjector.createServiceEditInjector();
    this.componentHostRef = this.componentHost.createComponent(EditApiComponent, { injector: componentInjector });
  }

  closeComponent() {
    if (this.componentHost) this.componentHost.clear();
    if (this.componentHostRef) this.componentHostRef.destroy();
  }
}
