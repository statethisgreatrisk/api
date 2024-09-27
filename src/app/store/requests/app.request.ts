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
    return this.http.get<User>(endpoint, { withCredentials: true });
  }

  // Auth

  authSignup(email: string, password: string): Observable<string> {
    const endpoint = `${url}/auth/signup`;
    return this.http.post<string>(endpoint, { signup: { email, password } }, { withCredentials: true });
  }

  authResend(email: string): Observable<string> {
    const endpoint = `${url}/auth/resend`;
    return this.http.post<string>(endpoint, { resend: { email } }, { withCredentials: true });
  }

  authConfirm(email: string, confirmationCode: string): Observable<string> {
    const endpoint = `${url}/auth/confirm`;
    return this.http.post<string>(endpoint, { confirm: { email, confirmationCode } }, { withCredentials: true });
  }

  authForgot(email: string): Observable<string> {
    const endpoint = `${url}/auth/forgot`;
    return this.http.post<string>(endpoint, { forgot: { email } }, { withCredentials: true });
  }

  authReset(email: string, password: string, confirmationCode: string): Observable<string> {
    const endpoint = `${url}/auth/reset`;
    return this.http.post<string>(endpoint, { reset: { email, password, confirmationCode } }, { withCredentials: true });
  }

  authLogin(email: string, password: string): Observable<string> {
    const endpoint = `${url}/auth/login`;
    return this.http.post<string>(endpoint, { login: { email, password } }, { withCredentials: true });
  }

  authRefresh(): Observable<string> {
    const endpoint = `${url}/auth/refresh`;
    return this.http.post<string>(endpoint, {}, { withCredentials: true });
  }

  authLogout(email: string): Observable<string> {
    const endpoint = `${url}/auth/logout`;
    return this.http.post<string>(endpoint, { logout: { email } }, { withCredentials: true });
  }
  
  authCheck(): Observable<string> {
    const endpoint = `${url}/auth/check`;
    return this.http.post<string>(endpoint, {}, { withCredentials: true });
  }

  // API

  getAPIs(userId: string): Observable<API[]> {
    const endpoint = `${url}/api/:userId`.replace(':userId', userId);
    return this.http.get<API[]>(endpoint, { withCredentials: true });
  }

  createAPI(api: API): Observable<API> {
    const endpoint = `${url}/api/:userId`.replace(':userId', api.userId);
    return this.http.post<API>(endpoint, { api }, { withCredentials: true });
  }

  updateAPI(api: API): Observable<API> {
    const endpoint = `${url}/api/:userId/:apiId`.replace(':userId', api.userId).replace(':apiId', api._id);
    return this.http.put<API>(endpoint, { api }, { withCredentials: true });
  }

  deleteAPI(userId: string, apiId: string): Observable<string> {
    const endpoint = `${url}/api/:userId/:apiId`.replace(':userId', userId).replace(':apiId', apiId);
    return this.http.delete<string>(endpoint, { withCredentials: true });
  }

  // Storage

  getStorages(userId: string): Observable<Storage[]> {
    const endpoint = `${url}/storage/:userId`.replace(':userId', userId);
    return this.http.get<Storage[]>(endpoint, { withCredentials: true });
  }
  
  createStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:userId`.replace(':userId', storage.userId);
    return this.http.post<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  updateStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:userId/:storageId`.replace(':userId', storage.userId).replace(':storageId', storage._id);
    return this.http.put<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  deleteStorage(userId: string, storageId: string): Observable<string> {
    const endpoint = `${url}/storage/:userId/:storageId`.replace(':userId', userId).replace(':storageId', storageId);
    return this.http.delete<string>(endpoint, { withCredentials: true });
  }

  // Schema

  getSchemas(userId: string): Observable<Schema[]> {
    const endpoint = `${url}/schema/:userId`.replace(':userId', userId);
    return this.http.get<Schema[]>(endpoint, { withCredentials: true });
  }
  
  createSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:userId`.replace(':userId', schema.userId);
    return this.http.post<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  updateSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:userId/:schemaId`.replace(':userId', schema.userId).replace(':schemaId', schema._id);
    return this.http.put<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  deleteSchema(userId: string, schemaId: string): Observable<string> {
    const endpoint = `${url}/schema/:userId/:schemaId`.replace(':userId', userId).replace(':schemaId', schemaId);
    return this.http.delete<string>(endpoint, { withCredentials: true });
  }

  // Validator

  getValidators(userId: string): Observable<Validator[]> {
    const endpoint = `${url}/validator/:userId`.replace(':userId', userId);
    return this.http.get<Validator[]>(endpoint, { withCredentials: true });
  }
  
  createValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:userId`.replace(':userId', validator.userId);
    return this.http.post<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  updateValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:userId/:validatorId`.replace(':userId', validator.userId).replace(':validatorId', validator._id);
    return this.http.put<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  deleteValidator(userId: string, validatorId: string): Observable<string> {
    const endpoint = `${url}/validator/:userId/:validatorId`.replace(':userId', userId).replace(':validatorId', validatorId);
    return this.http.delete<string>(endpoint, { withCredentials: true });
  }

  // Workflow

  getWorkflows(userId: string): Observable<Workflow[]> {
    const endpoint = `${url}/workflow/:userId`.replace(':userId', userId);
    return this.http.get<Workflow[]>(endpoint, { withCredentials: true });
  }
  
  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:userId`.replace(':userId', workflow.userId);
    return this.http.post<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  updateWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:userId/:workflowId`.replace(':userId', workflow.userId).replace(':workflowId', workflow._id);
    return this.http.put<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  deleteWorkflow(userId: string, workflowId: string): Observable<string> {
    const endpoint = `${url}/workflow/:userId/:workflowId`.replace(':userId', userId).replace(':workflowId', workflowId);
    return this.http.delete<string>(endpoint, { withCredentials: true });
  }

  // App

  getApps(userId: string): Observable<App[]> {
    const endpoint = `${url}/app/:userId`.replace(':userId', userId);
    return this.http.get<App[]>(endpoint, { withCredentials: true });
  }

  // Deploy

  getDeploys(userId: string): Observable<Deploy[]> {
    const endpoint = `${url}/deploy/:userId`.replace(':userId', userId);
    return this.http.get<Deploy[]>(endpoint, { withCredentials: true });
  }

  createDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:userId`.replace(':userId', deploy.userId);
    return this.http.post<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  updateDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:userId/:deployId`.replace(':userId', deploy.userId).replace(':deployId', deploy._id);
    return this.http.put<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  // Log

  getLogs(userId: string): Observable<Log[]> {
    const endpoint = `${url}/log/:userId`.replace(':userId', userId);
    return this.http.get<Log[]>(endpoint, { withCredentials: true });
  }

  createLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log/:userId`.replace(':userId', log.userId);
    return this.http.post<Log>(endpoint, { log }, { withCredentials: true });
  }

  updateLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log/:userId/:logId`.replace(':userId', log.userId).replace(':logId', log._id);
    return this.http.put<Log>(endpoint, { log }, { withCredentials: true });
  }

  // Key

  getKeys(userId: string): Observable<Key[]> {
    const endpoint = `${url}/key/:userId`.replace(':userId', userId);
    return this.http.get<Key[]>(endpoint, { withCredentials: true });
  }

  createKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key/:userId`.replace(':userId', key.userId);
    return this.http.post<Key>(endpoint, { key }, { withCredentials: true });
  }

  updateKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key/:userId/:keyId`.replace(':userId', key.userId).replace(':keyId', key._id);
    return this.http.put<Key>(endpoint, { key }, { withCredentials: true });
  }

  // Billing

  getBillings(userId: string): Observable<Billing[]> {
    const endpoint = `${url}/billing/:userId`.replace(':userId', userId);
    return this.http.get<Billing[]>(endpoint, { withCredentials: true });
  }

  createBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:userId`.replace(':userId', billing.userId);
    return this.http.post<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  updateBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:userId/:billingId`.replace(':userId', billing.userId).replace(':billingId', billing._id);
    return this.http.put<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  // Usage

  getUsages(userId: string): Observable<Usage[]> {
    const endpoint = `${url}/usage/:userId`.replace(':userId', userId);
    return this.http.get<Usage[]>(endpoint, { withCredentials: true });
  }

  createUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:userId`.replace(':userId', usage.userId);
    return this.http.post<Usage>(endpoint, { usage }, { withCredentials: true });
  }

  updateUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:userId/:usageId`.replace(':userId', usage.userId).replace(':usageId', usage._id);
    return this.http.put<Usage>(endpoint, { usage }, { withCredentials: true });
  }
}
