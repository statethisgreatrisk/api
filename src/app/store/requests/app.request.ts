import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API, App, Billing, Deploy, Key, Log, Project, ResponseMessage, Schema, Storage, Usage, User, Validator, Workflow } from "../interfaces/app.interface";

const url = 'http://localhost:3000/v1/dashboard';

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

  // App

  getApps(): Observable<App[]> {
    const endpoint = `${url}/app`;
    return this.http.get<App[]>(endpoint, { withCredentials: true });
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

  // Project

  getProjects(): Observable<Project[]> {
    const endpoint = `${url}/project`;
    return this.http.get<Project[]>(endpoint, { withCredentials: true });
  }

  createProject(project: Project): Observable<Project> {
    const endpoint = `${url}/project`;
    return this.http.post<Project>(endpoint, { project }, { withCredentials: true });
  }

  updateProject(projectId: string, project: Project): Observable<Project> {
    const endpoint = `${url}/project/:projectId`.replace(':projectId', projectId);
    return this.http.put<Project>(endpoint, { project }, { withCredentials: true });
  }

  deleteProject(projectId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/project/:projectId`.replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // API

  getAPIs(projectId: string): Observable<API[]> {
    const endpoint = `${url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.get<API[]>(endpoint, { withCredentials: true });
  }

  createAPI(projectId: string, api: API): Observable<API> {
    const endpoint = `${url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.post<API>(endpoint, { api }, { withCredentials: true });
  }

  updateAPI(projectId: string, api: API): Observable<API> {
    const endpoint = `${url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.put<API>(endpoint, { api }, { withCredentials: true });
  }

  deleteAPI(projectId: string, apiId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/api/:projectId/:apiId`.replace(':apiId', apiId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Storage

  getStorages(projectId: string): Observable<Storage[]> {
    const endpoint = `${url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.get<Storage[]>(endpoint, { withCredentials: true });
  }
  
  createStorage(projectId: string, storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.post<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  updateStorage(projectId: string, storage: Storage): Observable<Storage> {
    const endpoint = `${url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.put<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  deleteStorage(projectId: string, storageId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/storage/:projectId/:storageId`.replace(':storageId', storageId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Schema

  getSchemas(projectId: string): Observable<Schema[]> {
    const endpoint = `${url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.get<Schema[]>(endpoint, { withCredentials: true });
  }
  
  createSchema(projectId: string, schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.post<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  updateSchema(projectId: string, schema: Schema): Observable<Schema> {
    const endpoint = `${url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.put<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  deleteSchema(projectId: string, schemaId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/schema/:projectId/:schemaId`.replace(':schemaId', schemaId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Validator

  getValidators(projectId: string): Observable<Validator[]> {
    const endpoint = `${url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.get<Validator[]>(endpoint, { withCredentials: true });
  }
  
  createValidator(projectId: string, validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.post<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  updateValidator(projectId: string, validator: Validator): Observable<Validator> {
    const endpoint = `${url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.put<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  deleteValidator(projectId: string, validatorId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/validator/:projectId/:validatorId`.replace(':validatorId', validatorId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Workflow

  getWorkflows(projectId: string): Observable<Workflow[]> {
    const endpoint = `${url}/workflow/:projectId`.replace(':projectId', projectId);
    return this.http.get<Workflow[]>(endpoint, { withCredentials: true });
  }
  
  createWorkflow(projectId: string, workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:projectId`.replace(':projectId', projectId);
    return this.http.post<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  updateWorkflow(projectId: string, workflow: Workflow): Observable<Workflow> {
    const endpoint = `${url}/workflow/:projectId`.replace(':projectId', projectId);
    return this.http.put<Workflow>(endpoint, { workflow }, { withCredentials: true });
  }
  
  deleteWorkflow(projectId: string, workflowId: string): Observable<ResponseMessage> {
    const endpoint = `${url}/workflow/:projectId/:workflowId`.replace(':workflowId', workflowId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Deploy

  getDeploys(projectId: string): Observable<Deploy[]> {
    const endpoint = `${url}/deploy/:projectId`.replace(':projectId', projectId);
    return this.http.get<Deploy[]>(endpoint, { withCredentials: true });
  }

  createDeploy(projectId: string, deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:projectId`.replace(':projectId', projectId);
    return this.http.post<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  updateDeploy(projectId: string, deploy: Deploy): Observable<Deploy> {
    const endpoint = `${url}/deploy/:projectId`.replace(':projectId', projectId);
    return this.http.put<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  // Log

  getLogs(projectId: string): Observable<Log[]> {
    const endpoint = `${url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.get<Log[]>(endpoint, { withCredentials: true });
  }

  createLog(projectId: string, log: Log): Observable<Log> {
    const endpoint = `${url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.post<Log>(endpoint, { log }, { withCredentials: true });
  }

  updateLog(projectId: string, log: Log): Observable<Log> {
    const endpoint = `${url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.put<Log>(endpoint, { log }, { withCredentials: true });
  }

  // Key

  getKeys(projectId: string): Observable<Key[]> {
    const endpoint = `${url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.get<Key[]>(endpoint, { withCredentials: true });
  }

  createKey(projectId: string, key: Key): Observable<Key> {
    const endpoint = `${url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.post<Key>(endpoint, { key }, { withCredentials: true });
  }

  updateKey(projectId: string, key: Key): Observable<Key> {
    const endpoint = `${url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.put<Key>(endpoint, { key }, { withCredentials: true });
  }

  // Billing

  getBillings(projectId: string): Observable<Billing[]> {
    const endpoint = `${url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.get<Billing[]>(endpoint, { withCredentials: true });
  }

  createBilling(projectId: string, billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.post<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  updateBilling(projectId: string, billing: Billing): Observable<Billing> {
    const endpoint = `${url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.put<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  // Usage

  getUsages(projectId: string): Observable<Usage[]> {
    const endpoint = `${url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.get<Usage[]>(endpoint, { withCredentials: true });
  }

  createUsage(projectId: string, usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.post<Usage>(endpoint, { usage }, { withCredentials: true });
  }

  updateUsage(projectId: string, usage: Usage): Observable<Usage> {
    const endpoint = `${url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.put<Usage>(endpoint, { usage }, { withCredentials: true });
  }
}
