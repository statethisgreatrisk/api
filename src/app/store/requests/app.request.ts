import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API, App, Billing, Deploy, Key, Log, ResponseMessage, Schema, Storage, Usage, User, Validator, Workflow } from "../interfaces/app.interface";

const url = 'http://localhost:3000/v1';

@Injectable({
  providedIn: 'root'
})
export class AppRequest {
  constructor(private http: HttpClient) {}

  // User

  getUser(): Observable<User> {
    const endpoint = `${url}/user`;
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

  getAPIs(): Observable<API[]> {
    const endpoint = `${url}/api`;
    return this.http.get<API[]>(endpoint, { withCredentials: true });
  }

  createAPI(api: API): Observable<API> {
    const endpoint = `${url}/api`;
    return this.http.post<API>(endpoint, { api }, { withCredentials: true });
  }

  updateAPI(api: API): Observable<API> {
    const endpoint = `${url}/api`;
    return this.http.put<API>(endpoint, { api }, { withCredentials: true });
  }

  deleteAPI(apiId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/api/:apiId`.replace(':apiId', apiId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Storage

  getStorages(): Observable<Storage[]> {
    const endpoint = `${url}/storage`;
    return this.http.get<Storage[]>(endpoint, { withCredentials: true });
  }
  
  createStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage`;
    return this.http.post<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  updateStorage(storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage`;
    return this.http.put<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  deleteStorage(storageId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/storage/:storageId`.replace(':storageId', storageId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Schema

  getSchemas(): Observable<Schema[]> {
    const endpoint = `${url}/schema`;
    return this.http.get<Schema[]>(endpoint, { withCredentials: true });
  }
  
  createSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema`;
    return this.http.post<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  updateSchema(schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema`;
    return this.http.put<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  deleteSchema(schemaId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/schema/:schemaId`.replace(':schemaId', schemaId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Validator

  getValidators(): Observable<Validator[]> {
    const endpoint = `${url}/validator`;
    return this.http.get<Validator[]>(endpoint, { withCredentials: true });
  }
  
  createValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator`;
    return this.http.post<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  updateValidator(validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator`;
    return this.http.put<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  deleteValidator(validatorId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/validator/:validatorId`.replace(':validatorId', validatorId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Workflow

  getWorkflows(): Observable<Workflow[]> {
    const endpoint = `${url}/workflow`;
    return this.http.get<Workflow[]>(endpoint, { withCredentials: true });
  }
  
  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow`;
    return this.http.post<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  updateWorkflow(workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow`;
    return this.http.put<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  deleteWorkflow(workflowId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/workflow/:workflowId`.replace(':workflowId', workflowId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // App

  getApps(): Observable<App[]> {
    const endpoint = `${url}/app`;
    return this.http.get<App[]>(endpoint, { withCredentials: true });
  }

  // Deploy

  getDeploys(): Observable<Deploy[]> {
    const endpoint = `${url}/deploy`;
    return this.http.get<Deploy[]>(endpoint, { withCredentials: true });
  }

  createDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy`;
    return this.http.post<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  updateDeploy(deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy`;
    return this.http.put<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  // Log

  getLogs(): Observable<Log[]> {
    const endpoint = `${url}/log`;
    return this.http.get<Log[]>(endpoint, { withCredentials: true });
  }

  createLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log`;
    return this.http.post<Log>(endpoint, { log }, { withCredentials: true });
  }

  updateLog(log: Log): Observable<Log> {
    const endpoint = `${url}/log`;
    return this.http.put<Log>(endpoint, { log }, { withCredentials: true });
  }

  // Key

  getKeys(): Observable<Key[]> {
    const endpoint = `${url}/key`;
    return this.http.get<Key[]>(endpoint, { withCredentials: true });
  }

  createKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key`;
    return this.http.post<Key>(endpoint, { key }, { withCredentials: true });
  }

  updateKey(key: Key): Observable<Key> {
    const endpoint = `${url}/key`;
    return this.http.put<Key>(endpoint, { key }, { withCredentials: true });
  }

  // Billing

  getBillings(): Observable<Billing[]> {
    const endpoint = `${url}/billing`;
    return this.http.get<Billing[]>(endpoint, { withCredentials: true });
  }

  createBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing`;
    return this.http.post<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  updateBilling(billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing`;
    return this.http.put<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  // Usage

  getUsages(): Observable<Usage[]> {
    const endpoint = `${url}/usage`;
    return this.http.get<Usage[]>(endpoint, { withCredentials: true });
  }

  createUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage`;
    return this.http.post<Usage>(endpoint, { usage }, { withCredentials: true });
  }

  updateUsage(usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage`;
    return this.http.put<Usage>(endpoint, { usage }, { withCredentials: true });
  }
}
