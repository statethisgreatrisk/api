import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInjectorService {
  constructor(private injector: Injector) {}

  createServiceEditInjector(): Injector {
    return Injector.create({
      providers: [],
      parent: this.injector
    });
  }
}
