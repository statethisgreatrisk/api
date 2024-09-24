import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API, App, Schema, Storage, User, Validator, Workflow } from "../interfaces/app.interface";

const url = 'http://localhost:3000/v1';

@Injectable({
  providedIn: 'root'
})
export class AppRequest {
  constructor(private http: HttpClient) {}

  // User

  getUser(userId: string): Observable<User> {
    const endpoint = `${url}/user/:userId`.replace(':userId', userId);
    return this.http.get<User>(endpoint);
  }

  // API

  getAPIs(userId: string): Observable<API[]> {
    const endpoint = `${url}/api/:userId`.replace(':userId', userId);
    return this.http.get<API[]>(endpoint);
  }

  createAPI(api: API): Observable<API> {
    const endpoint = `${url}/api/:userId`.replace(':userId', api.userId);
    return this.http.post<API>(endpoint, { api });
  }

  updateAPI(api: API): Observable<API> {
    const endpoint = `${url}/api/:userId/:apiId`.replace(':userId', api.userId).replace(':apiId', api._id);
    return this.http.put<API>(endpoint, { api });
  }

  deleteAPI(userId: string, apiId: string): Observable<string> {
    const endpoint = `${url}/api/:userId/:apiId`.replace(':userId', userId).replace(':apiId', apiId);
    return this.http.delete<string>(endpoint);
  }

  // Storage

  getStorages(userId: string): Observable<Storage[]> {
    const endpoint = `${url}/storage/:userId`.replace(':userId', userId);
    return this.http.get<Storage[]>(endpoint);
  }
  
  createStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:userId`.replace(':userId', storage.userId);
    return this.http.post<Storage>(endpoint, { storage });
  }
  
  updateStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:userId/:storageId`.replace(':userId', storage.userId).replace(':storageId', storage._id);
    return this.http.put<Storage>(endpoint, { storage });
  }
  
  deleteStorage(userId: string, storageId: string): Observable<string> {
    const endpoint = `${url}/storage/:userId/:storageId`.replace(':userId', userId).replace(':storageId', storageId);
    return this.http.delete<string>(endpoint);
  }

  // Schema

  getSchemas(userId: string): Observable<Schema[]> {
    const endpoint = `${url}/schema/:userId`.replace(':userId', userId);
    return this.http.get<Schema[]>(endpoint);
  }
  
  createSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:userId`.replace(':userId', schema.userId);
    return this.http.post<Schema>(endpoint, { schema });
  }
  
  updateSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:userId/:schemaId`.replace(':userId', schema.userId).replace(':schemaId', schema._id);
    return this.http.put<Schema>(endpoint, { schema });
  }
  
  deleteSchema(userId: string, schemaId: string): Observable<string> {
    const endpoint = `${url}/schema/:userId/:schemaId`.replace(':userId', userId).replace(':schemaId', schemaId);
    return this.http.delete<string>(endpoint);
  }

  // Validator

  getValidators(userId: string): Observable<Validator[]> {
    const endpoint = `${url}/validator/:userId`.replace(':userId', userId);
    return this.http.get<Validator[]>(endpoint);
  }
  
  createValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:userId`.replace(':userId', validator.userId);
    return this.http.post<Validator>(endpoint, { validator });
  }
  
  updateValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:userId/:validatorId`.replace(':userId', validator.userId).replace(':validatorId', validator._id);
    return this.http.put<Validator>(endpoint, { validator });
  }
  
  deleteValidator(userId: string, validatorId: string): Observable<string> {
    const endpoint = `${url}/validator/:userId/:validatorId`.replace(':userId', userId).replace(':validatorId', validatorId);
    return this.http.delete<string>(endpoint);
  }

  // Workflow

  getWorkflows(userId: string): Observable<Workflow[]> {
    const endpoint = `${url}/workflow/:userId`.replace(':userId', userId);
    return this.http.get<Workflow[]>(endpoint);
  }
  
  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:userId`.replace(':userId', workflow.userId);
    return this.http.post<Workflow>(endpoint, { workflow });
  }
  
  updateWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:userId/:workflowId`.replace(':userId', workflow.userId).replace(':workflowId', workflow._id);
    return this.http.put<Workflow>(endpoint, { workflow });
  }
  
  deleteWorkflow(userId: string, workflowId: string): Observable<string> {
    const endpoint = `${url}/workflow/:userId/:workflowId`.replace(':userId', userId).replace(':workflowId', workflowId);
    return this.http.delete<string>(endpoint);
  }

  // App

  getApps(userId: string): Observable<App[]> {
    const endpoint = `${url}/app/:userId`.replace(':userId', userId);
    return this.http.get<App[]>(endpoint);
  }
}
