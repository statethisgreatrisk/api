import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AppStateInit, Project, Register, User, View } from '../../store/interfaces/app.interface';
import { selectMainProject, selectRegisters, selectUser, selectView } from '../../store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, catchError, combineLatest, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { createRegister, deleteRegister } from '../../store/actions/app.action';
import { DeleteService } from '../../services/delete.service';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {
  user: User | null = null;
  view: View = { service: '', serviceId: '', window: '', windowId: '' };
  project: Project | null = null;
  registers: Register[] | null = null;

  register = '';

  sub: Subscription | null = null;
  requestSub: Subscription | null = null;

  activated = false;

  constructor(
    private store: Store<AppStateInit>,
    private deleteService: DeleteService,
    private toastService: ToastService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.initLatest();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  initLatest() {
    this.sub = combineLatest([
      this.store.select(selectUser),
      this.store.select(selectView),
      this.store.select(selectMainProject),
      this.store.select(selectRegisters),
    ]).subscribe(([user, view, project, registers]) => {
      this.user = user;
      this.view = view;
      this.project = project;
      this.registers = cloneDeep(registers);
      
      this.npmVersions();
    });
  }

  async addRegister() {
    if (!this.project) return;
    if (!this.user) return;
    if (!this.register) return;

    this.requestSub = this.http.get(`https://registry.npmjs.org/${this.register}`)
      .pipe(catchError((error) => {
        this.toastService.addToast({ type: 'alert', text: 'Package not found' });
        this.requestSub?.unsubscribe();
        return EMPTY;
      }))
      .subscribe((data: any) => {
        const userId = this.user!._id;
        const projectId = this.project!._id;
        const _id = '';
        const name = this.register;
        const date = new Date().toISOString();
        const active = true;

        this.store.dispatch(createRegister({ projectId: this.project!._id, register: { _id, userId, projectId, active, date, name, version: '' } }));
        this.register = '';
        this.requestSub?.unsubscribe();
      });
  }

  delete(register: Register) {
    if (!this.project) return;
    if (!register) return;

    this.deleteService.initDelete({
      service: 'Package',
      serviceData: register,
      deleteFn: () => {
        this.store.dispatch(deleteRegister({ projectId: this.project!._id, registerId: register._id }));
      },
    });
  }

  setVersion(registerId: string, version: string) {
    this.registers = this.registers!.map((existingRegister) => {
      if (existingRegister._id === registerId) {
        existingRegister.version = version;
      }

      return existingRegister;
    });
  }

  requestNpm(register: Register) {
    return new Promise((resolve, reject) => {
      this.requestSub = this.http.get(`https://registry.npmjs.org/${register.name}`)
        .pipe(catchError((error) => {
          this.setVersion(register._id, 'Not found');
          reject();
          this.requestSub?.unsubscribe();
          return EMPTY;
        }))
        .subscribe((data: any) => {
          const version = data['dist-tags']?.latest || 'Not found';
          this.setVersion(register._id, version);
          this.requestSub?.unsubscribe();
          resolve(true);
        });
    });
  }

  async npmVersions() {
    if (!this.registers) return;

    try {
      for (const register of this.registers) {
        await this.requestNpm(register);
      }
    } catch(err) {

    }
  }

  activate() {
    this.activated = true;
  }
}
