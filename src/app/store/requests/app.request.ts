import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API, App, Billing, Deploy, Key, Log, Schema, Storage, Usage, User, Validator, Workflow } from "../interfaces/app.interface";

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

  // Deploy

  getDeploys(userId: string): Observable<Deploy[]> {
    const endpoint = `${url}/deploy/:userId`.replace(':userId', userId);
    return this.http.get<Deploy[]>(endpoint);
  }

  createDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:userId`.replace(':userId', deploy.userId);
    return this.http.post<Deploy>(endpoint, { deploy });
  }

  updateDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:userId/:deployId`.replace(':userId', deploy.userId).replace(':deployId', deploy._id);
    return this.http.put<Deploy>(endpoint, { deploy });
  }

  // Log

  getLogs(userId: string): Observable<Log[]> {
    const endpoint = `${url}/log/:userId`.replace(':userId', userId);
    return this.http.get<Log[]>(endpoint);
  }

  createLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log/:userId`.replace(':userId', log.userId);
    return this.http.post<Log>(endpoint, { log });
  }

  updateLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log/:userId/:logId`.replace(':userId', log.userId).replace(':logId', log._id);
    return this.http.put<Log>(endpoint, { log });
  }

  // Key

  getKeys(userId: string): Observable<Key[]> {
    const endpoint = `${url}/key/:userId`.replace(':userId', userId);
    return this.http.get<Key[]>(endpoint);
  }

  createKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key/:userId`.replace(':userId', key.userId);
    return this.http.post<Key>(endpoint, { key });
  }

  updateKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key/:userId/:keyId`.replace(':userId', key.userId).replace(':keyId', key._id);
    return this.http.put<Key>(endpoint, { key });
  }

  // Billing

  getBillings(userId: string): Observable<Billing[]> {
    const endpoint = `${url}/billing/:userId`.replace(':userId', userId);
    return this.http.get<Billing[]>(endpoint);
  }

  createBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:userId`.replace(':userId', billing.userId);
    return this.http.post<Billing>(endpoint, { billing });
  }

  updateBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:userId/:billingId`.replace(':userId', billing.userId).replace(':billingId', billing._id);
    return this.http.put<Billing>(endpoint, { billing });
  }

  // Usage

  getUsages(userId: string): Observable<Usage[]> {
    const endpoint = `${url}/usage/:userId`.replace(':userId', userId);
    return this.http.get<Usage[]>(endpoint);
  }

  createUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:userId`.replace(':userId', usage.userId);
    return this.http.post<Usage>(endpoint, { usage });
  }

  updateUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:userId/:usageId`.replace(':userId', usage.userId).replace(':usageId', usage._id);
    return this.http.put<Usage>(endpoint, { usage });
  }
}
