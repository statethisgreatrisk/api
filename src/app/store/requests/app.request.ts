import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { API, Billing, Deploy, Fn, Key, Log, Project, ResponseMessage, Schema, Storage, Usage, User, Validator, Document, Sub, DeployStatus, Instance, Request, Variable, Websocket, Queue, Scheduler, Register, ProjectSetup, ProjectSettings, ProjectData, Job, Pool, Code, CodeExport, Chat, ChatChunk } from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class AppRequest {
  url = `${environment.apiUrl}/v1/dashboard`;
  serviceUrl = `${environment.apiUrl}/v1/service`;

  constructor(private http: HttpClient) {}

  // User

  getUser(): Observable<User> {
    const endpoint = `${this.url}/user`;
    return this.http.get<User>(endpoint, { withCredentials: true });
  }

  // Auth

  authSignup(email: string, password: string): Observable<string> {
    const endpoint = `${this.url}/auth/signup`;
    return this.http.post<string>(endpoint, { signup: { email, password } }, { withCredentials: true });
  }

  authResend(email: string): Observable<string> {
    const endpoint = `${this.url}/auth/resend`;
    return this.http.post<string>(endpoint, { resend: { email } }, { withCredentials: true });
  }

  authConfirm(email: string, confirmationCode: string): Observable<string> {
    const endpoint = `${this.url}/auth/confirm`;
    return this.http.post<string>(endpoint, { confirm: { email, confirmationCode } }, { withCredentials: true });
  }

  authForgot(email: string): Observable<string> {
    const endpoint = `${this.url}/auth/forgot`;
    return this.http.post<string>(endpoint, { forgot: { email } }, { withCredentials: true });
  }

  authReset(email: string, password: string, confirmationCode: string): Observable<string> {
    const endpoint = `${this.url}/auth/reset`;
    return this.http.post<string>(endpoint, { reset: { email, password, confirmationCode } }, { withCredentials: true });
  }

  authLogin(email: string, password: string): Observable<string> {
    const endpoint = `${this.url}/auth/login`;
    return this.http.post<string>(endpoint, { login: { email, password } }, { withCredentials: true });
  }

  authRefresh(): Observable<string> {
    const endpoint = `${this.url}/auth/refresh`;
    return this.http.post<string>(endpoint, {}, { withCredentials: true });
  }

  authLogout(email: string): Observable<string> {
    const endpoint = `${this.url}/auth/logout`;
    return this.http.post<string>(endpoint, { logout: { email } }, { withCredentials: true });
  }
  
  authCheck(): Observable<string> {
    const endpoint = `${this.url}/auth/check`;
    return this.http.post<string>(endpoint, {}, { withCredentials: true });
  }

  // Project

  getProjectSetup(): Observable<ProjectSetup> {
    const endpoint = `${this.url}/project/setup`;
    return this.http.get<ProjectSetup>(endpoint, { withCredentials: true });
  }

  getProjectData(projectId: string): Observable<ProjectData> {
    const endpoint = `${this.url}/project/:projectId/data`.replace(':projectId', projectId);
    return this.http.get<ProjectData>(endpoint, { withCredentials: true });
  }

  getProjectSettings(projectId: string): Observable<ProjectSettings> {
    const endpoint = `${this.url}/project/:projectId/settings`.replace(':projectId', projectId);
    return this.http.get<ProjectSettings>(endpoint, { withCredentials: true });
  }

  getProjects(): Observable<Project[]> {
    const endpoint = `${this.url}/project`;
    return this.http.get<Project[]>(endpoint, { withCredentials: true });
  }

  createProject(project: Project): Observable<Project> {
    const endpoint = `${this.url}/project`;
    return this.http.post<Project>(endpoint, { project }, { withCredentials: true });
  }

  updateProject(projectId: string, project: Project): Observable<Project> {
    const endpoint = `${this.url}/project/:projectId`.replace(':projectId', projectId);
    return this.http.put<Project>(endpoint, { project }, { withCredentials: true });
  }

  deleteProject(projectId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/project/:projectId`.replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // API

  getAPIs(projectId: string): Observable<API[]> {
    const endpoint = `${this.url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.get<API[]>(endpoint, { withCredentials: true });
  }

  createAPI(projectId: string, api: API): Observable<API> {
    const endpoint = `${this.url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.post<API>(endpoint, { api }, { withCredentials: true });
  }

  updateAPI(projectId: string, api: API): Observable<API> {
    const endpoint = `${this.url}/api/:projectId`.replace(':projectId', projectId);
    return this.http.put<API>(endpoint, { api }, { withCredentials: true });
  }

  deleteAPI(projectId: string, apiId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/api/:projectId/:apiId`.replace(':apiId', apiId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Storage

  getStorages(projectId: string): Observable<Storage[]> {
    const endpoint = `${this.url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.get<Storage[]>(endpoint, { withCredentials: true });
  }
  
  createStorage(projectId: string, storage: Storage): Observable<Storage> {
    const endpoint = `${this.url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.post<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  updateStorage(projectId: string, storage: Storage): Observable<Storage> {
    const endpoint = `${this.url}/storage/:projectId`.replace(':projectId', projectId);
    return this.http.put<Storage>(endpoint, { storage }, { withCredentials: true });
  }
  
  deleteStorage(projectId: string, storageId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/storage/:projectId/:storageId`.replace(':storageId', storageId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Schema

  getSchemas(projectId: string): Observable<Schema[]> {
    const endpoint = `${this.url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.get<Schema[]>(endpoint, { withCredentials: true });
  }
  
  createSchema(projectId: string, schema: Schema): Observable<Schema> {
    const endpoint = `${this.url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.post<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  updateSchema(projectId: string, schema: Schema): Observable<Schema> {
    const endpoint = `${this.url}/schema/:projectId`.replace(':projectId', projectId);
    return this.http.put<Schema>(endpoint, { schema }, { withCredentials: true });
  }
  
  deleteSchema(projectId: string, schemaId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/schema/:projectId/:schemaId`.replace(':schemaId', schemaId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Validator

  getValidators(projectId: string): Observable<Validator[]> {
    const endpoint = `${this.url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.get<Validator[]>(endpoint, { withCredentials: true });
  }
  
  createValidator(projectId: string, validator: Validator): Observable<Validator> {
    const endpoint = `${this.url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.post<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  updateValidator(projectId: string, validator: Validator): Observable<Validator> {
    const endpoint = `${this.url}/validator/:projectId`.replace(':projectId', projectId);
    return this.http.put<Validator>(endpoint, { validator }, { withCredentials: true });
  }
  
  deleteValidator(projectId: string, validatorId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/validator/:projectId/:validatorId`.replace(':validatorId', validatorId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Code

  getCodes(projectId: string): Observable<Code[]> {
    const endpoint = `${this.url}/code/:projectId`.replace(':projectId', projectId);
    return this.http.get<Code[]>(endpoint, { withCredentials: true });
  }
  
  createCode(projectId: string, code: CodeExport): Observable<Code> {
    const endpoint = `${this.url}/code/:projectId`.replace(':projectId', projectId);
    return this.http.post<Code>(endpoint, { code }, { withCredentials: true });
  }
  
  updateCode(projectId: string, code: CodeExport): Observable<Code> {
    const endpoint = `${this.url}/code/:projectId`.replace(':projectId', projectId);
    return this.http.put<Code>(endpoint, { code }, { withCredentials: true });
  }
  
  deleteCode(projectId: string, codeId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/code/:projectId/:codeId`.replace(':codeId', codeId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Chat

  getChats(projectId: string): Observable<Chat[]> {
    const endpoint = `${this.url}/chat/:projectId`.replace(':projectId', projectId);
    return this.http.get<Chat[]>(endpoint, { withCredentials: true });
  }
  
  createChat(projectId: string, chat: Chat): Observable<Chat> {
    const endpoint = `${this.url}/chat/:projectId`.replace(':projectId', projectId);
    return this.http.post<Chat>(endpoint, { chat }, { withCredentials: true });
  }
  
  updateChat(projectId: string, chat: Chat): Observable<Chat> {
    const endpoint = `${this.url}/chat/:projectId`.replace(':projectId', projectId);
    return this.http.put<Chat>(endpoint, { chat }, { withCredentials: true });
  }

  streamChat(projectId: string, chatId: string): Observable<ChatChunk> {
    const chatSubject = new Subject<ChatChunk>();
    const endpoint = `${this.url}/chat/stream/:projectId/:chatId`.replace(':projectId', projectId).replace(':chatId', chatId);
    const chatStream = new EventSource(endpoint, { withCredentials: true });

    chatStream.onmessage = (event) => {
      try {
        const parsed: ChatChunk = JSON.parse(event.data);

        if (parsed.done) {
          chatSubject.next(parsed);
          chatSubject.complete();
          chatStream.close();
        } else {
          chatSubject.next(parsed);
        }
      } catch (err) {
        chatSubject.error(err);
        chatStream.close();
      }
    };

    chatStream.onerror = (error) => {
      chatSubject.error(error);
      chatStream.close();
    };
    
    return chatSubject.asObservable();
  }
  
  deleteChat(projectId: string, chatId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/chat/:projectId/:chatId`.replace(':chatId', chatId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Fn

  getFns(projectId: string): Observable<Fn[]> {
    const endpoint = `${this.url}/fn/:projectId`.replace(':projectId', projectId);
    return this.http.get<Fn[]>(endpoint, { withCredentials: true });
  }
  
  createFn(projectId: string, fn: Fn): Observable<Fn> {
    const endpoint = `${this.url}/fn/:projectId`.replace(':projectId', projectId);
    return this.http.post<Fn>(endpoint, { fn }, { withCredentials: true });
  }
  
  updateFn(projectId: string, fn: Fn): Observable<Fn> {
    const endpoint = `${this.url}/fn/:projectId`.replace(':projectId', projectId);
    return this.http.put<Fn>(endpoint, { fn }, { withCredentials: true });
  }
  
  deleteFn(projectId: string, fnId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/fn/:projectId/:fnId`.replace(':fnId', fnId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Request

  getRequests(projectId: string): Observable<Request[]> {
    const endpoint = `${this.url}/request/:projectId`.replace(':projectId', projectId);
    return this.http.get<Request[]>(endpoint, { withCredentials: true });
  }
  
  createRequest(projectId: string, request: Request): Observable<Request> {
    const endpoint = `${this.url}/request/:projectId`.replace(':projectId', projectId);
    return this.http.post<Request>(endpoint, { request }, { withCredentials: true });
  }
  
  updateRequest(projectId: string, request: Request): Observable<Request> {
    const endpoint = `${this.url}/request/:projectId`.replace(':projectId', projectId);
    return this.http.put<Request>(endpoint, { request }, { withCredentials: true });
  }
  
  deleteRequest(projectId: string, requestId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/request/:projectId/:requestId`.replace(':requestId', requestId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Variable

  getVariables(projectId: string): Observable<Variable[]> {
    const endpoint = `${this.url}/variable/:projectId`.replace(':projectId', projectId);
    return this.http.get<Variable[]>(endpoint, { withCredentials: true });
  }

  getVariableValue(projectId: string, variableId: string): Observable<Variable> {
    const endpoint = `${this.url}/variable/:projectId/:variableId`.replace(':projectId', projectId).replace(':variableId', variableId);
    return this.http.get<Variable>(endpoint, { withCredentials: true });
  }
  
  createVariable(projectId: string, variable: Variable): Observable<Variable> {
    const endpoint = `${this.url}/variable/:projectId`.replace(':projectId', projectId);
    return this.http.post<Variable>(endpoint, { variable }, { withCredentials: true });
  }
  
  updateVariable(projectId: string, variable: Variable): Observable<Variable> {
    const endpoint = `${this.url}/variable/:projectId`.replace(':projectId', projectId);
    return this.http.put<Variable>(endpoint, { variable }, { withCredentials: true });
  }
  
  deleteVariable(projectId: string, variableId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/variable/:projectId/:variableId`.replace(':variableId', variableId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Websocket

  getWebsockets(projectId: string): Observable<Websocket[]> {
    const endpoint = `${this.url}/websocket/:projectId`.replace(':projectId', projectId);
    return this.http.get<Websocket[]>(endpoint, { withCredentials: true });
  }
  
  createWebsocket(projectId: string, websocket: Websocket): Observable<Websocket> {
    const endpoint = `${this.url}/websocket/:projectId`.replace(':projectId', projectId);
    return this.http.post<Websocket>(endpoint, { websocket }, { withCredentials: true });
  }
  
  updateWebsocket(projectId: string, websocket: Websocket): Observable<Websocket> {
    const endpoint = `${this.url}/websocket/:projectId`.replace(':projectId', projectId);
    return this.http.put<Websocket>(endpoint, { websocket }, { withCredentials: true });
  }
  
  deleteWebsocket(projectId: string, websocketId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/websocket/:projectId/:websocketId`.replace(':websocketId', websocketId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Queue

  getQueues(projectId: string): Observable<Queue[]> {
    const endpoint = `${this.url}/queue/:projectId`.replace(':projectId', projectId);
    return this.http.get<Queue[]>(endpoint, { withCredentials: true });
  }
  
  createQueue(projectId: string, queue: Queue): Observable<Queue> {
    const endpoint = `${this.url}/queue/:projectId`.replace(':projectId', projectId);
    return this.http.post<Queue>(endpoint, { queue }, { withCredentials: true });
  }
  
  updateQueue(projectId: string, queue: Queue): Observable<Queue> {
    const endpoint = `${this.url}/queue/:projectId`.replace(':projectId', projectId);
    return this.http.put<Queue>(endpoint, { queue }, { withCredentials: true });
  }
  
  deleteQueue(projectId: string, queueId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/queue/:projectId/:queueId`.replace(':queueId', queueId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Scheduler

  getSchedulers(projectId: string): Observable<Scheduler[]> {
    const endpoint = `${this.url}/scheduler/:projectId`.replace(':projectId', projectId);
    return this.http.get<Scheduler[]>(endpoint, { withCredentials: true });
  }
  
  createScheduler(projectId: string, scheduler: Scheduler): Observable<Scheduler> {
    const endpoint = `${this.url}/scheduler/:projectId`.replace(':projectId', projectId);
    return this.http.post<Scheduler>(endpoint, { scheduler }, { withCredentials: true });
  }
  
  updateScheduler(projectId: string, scheduler: Scheduler): Observable<Scheduler> {
    const endpoint = `${this.url}/scheduler/:projectId`.replace(':projectId', projectId);
    return this.http.put<Scheduler>(endpoint, { scheduler }, { withCredentials: true });
  }
  
  deleteScheduler(projectId: string, schedulerId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/scheduler/:projectId/:schedulerId`.replace(':schedulerId', schedulerId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Register

  getRegisters(projectId: string): Observable<Register[]> {
    const endpoint = `${this.url}/register/:projectId`.replace(':projectId', projectId);
    return this.http.get<Register[]>(endpoint, { withCredentials: true });
  }
  
  createRegister(projectId: string, register: Register): Observable<Register> {
    const endpoint = `${this.url}/register/:projectId`.replace(':projectId', projectId);
    return this.http.post<Register>(endpoint, { register }, { withCredentials: true });
  }
  
  updateRegister(projectId: string, register: Register): Observable<Register> {
    const endpoint = `${this.url}/register/:projectId`.replace(':projectId', projectId);
    return this.http.put<Register>(endpoint, { register }, { withCredentials: true });
  }
  
  deleteRegister(projectId: string, registerId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/register/:projectId/:registerId`.replace(':registerId', registerId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Document

  getDocuments(projectId: string): Observable<Document[]> {
    const endpoint = `${this.serviceUrl}/document/:projectId`.replace(':projectId', projectId);
    return this.http.get<Document[]>(endpoint, { withCredentials: true });
  }
  
  createDocument(projectId: string, document: Document): Observable<Document> {
    const endpoint = `${this.serviceUrl}/document/:projectId`.replace(':projectId', projectId);
    return this.http.post<Document>(endpoint, { document }, { withCredentials: true });
  }
  
  updateDocument(projectId: string, document: Document): Observable<Document> {
    const endpoint = `${this.serviceUrl}/document/:projectId`.replace(':projectId', projectId);
    return this.http.put<Document>(endpoint, { document }, { withCredentials: true });
  }
  
  deleteDocument(projectId: string, documentId: string): Observable<ResponseMessage> {
    const endpoint = `${this.serviceUrl}/document/:projectId/:documentId`.replace(':documentId', documentId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Instance

  getInstance(projectId: string): Observable<Instance> {
    const endpoint = `${this.url}/instance/:projectId`.replace(':projectId', projectId);
    return this.http.get<Instance>(endpoint, { withCredentials: true });
  }

  // Deploy

  getDeploys(projectId: string): Observable<Deploy[]> {
    const endpoint = `${this.url}/deploy/:projectId`.replace(':projectId', projectId);
    return this.http.get<Deploy[]>(endpoint, { withCredentials: true });
  }

  startDeploy(projectId: string, deploy: Deploy): Observable<Deploy> {
    const endpoint = `${this.url}/deploy/start/:projectId`.replace(':projectId', projectId);
    return this.http.post<Deploy>(endpoint, { deploy }, { withCredentials: true });
  }

  stopDeploy(projectId: string, deployId: string): Observable<Deploy> {
    const endpoint = `${this.url}/deploy/stop/:projectId/:deployId`.replace(':projectId', projectId).replace(':deployId', deployId);
    return this.http.put<Deploy>(endpoint, {}, { withCredentials: true });
  }

  getDeployStatus(projectId: string, deployId: string): Observable<DeployStatus> {
    const endpoint = `${this.url}/deploy/status/:projectId/:deployId`.replace(':projectId', projectId).replace(':deployId', deployId);
    return this.http.get<DeployStatus>(endpoint, { withCredentials: true });
  }

  // Log

  getLogs(projectId: string): Observable<Log[]> {
    const endpoint = `${this.url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.get<Log[]>(endpoint, { withCredentials: true });
  }

  createLog(projectId: string, log: Log): Observable<Log> {
    const endpoint = `${this.url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.post<Log>(endpoint, { log }, { withCredentials: true });
  }

  updateLog(projectId: string, log: Log): Observable<Log> {
    const endpoint = `${this.url}/log/:projectId`.replace(':projectId', projectId);
    return this.http.put<Log>(endpoint, { log }, { withCredentials: true });
  }

  // Job

  getJobs(projectId: string): Observable<Job[]> {
    const endpoint = `${this.url}/job/:projectId`.replace(':projectId', projectId);
    return this.http.get<Job[]>(endpoint, { withCredentials: true });
  }

  // Key

  getKeys(projectId: string): Observable<Key[]> {
    const endpoint = `${this.url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.get<Key[]>(endpoint, { withCredentials: true });
  }

  createKey(projectId: string, key: Key): Observable<Key> {
    const endpoint = `${this.url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.post<Key>(endpoint, { key }, { withCredentials: true });
  }

  updateKey(projectId: string, key: Key): Observable<Key> {
    const endpoint = `${this.url}/key/:projectId`.replace(':projectId', projectId);
    return this.http.put<Key>(endpoint, { key }, { withCredentials: true });
  }

  deleteKey(projectId: string, keyId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/key/:projectId/:keyId`.replace(':keyId', keyId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Billing

  getBillings(projectId: string): Observable<Billing[]> {
    const endpoint = `${this.url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.get<Billing[]>(endpoint, { withCredentials: true });
  }

  createBilling(projectId: string, billing: Billing): Observable<Billing> {
    const endpoint = `${this.url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.post<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  updateBilling(projectId: string, billing: Billing): Observable<Billing> {
    const endpoint = `${this.url}/billing/:projectId`.replace(':projectId', projectId);
    return this.http.put<Billing>(endpoint, { billing }, { withCredentials: true });
  }

  // Usage

  getUsages(projectId: string): Observable<Usage[]> {
    const endpoint = `${this.url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.get<Usage[]>(endpoint, { withCredentials: true });
  }

  createUsage(projectId: string, usage: Usage): Observable<Usage> {
    const endpoint = `${this.url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.post<Usage>(endpoint, { usage }, { withCredentials: true });
  }

  updateUsage(projectId: string, usage: Usage): Observable<Usage> {
    const endpoint = `${this.url}/usage/:projectId`.replace(':projectId', projectId);
    return this.http.put<Usage>(endpoint, { usage }, { withCredentials: true });
  }

  // Sub

  getSubs(projectId: string): Observable<Sub[]> {
    const endpoint = `${this.serviceUrl}/sub/:projectId`.replace(':projectId', projectId);
    return this.http.get<Sub[]>(endpoint, { withCredentials: true });
  }
  
  createSub(projectId: string, sub: Sub): Observable<Sub> {
    const endpoint = `${this.serviceUrl}/sub/:projectId`.replace(':projectId', projectId);
    return this.http.post<Sub>(endpoint, { sub }, { withCredentials: true });
  }
  
  updateSub(projectId: string, sub: Sub): Observable<Sub> {
    const endpoint = `${this.serviceUrl}/sub/:projectId`.replace(':projectId', projectId);
    return this.http.put<Sub>(endpoint, { sub }, { withCredentials: true });
  }
  
  deleteSub(projectId: string, subId: string): Observable<ResponseMessage> {
    const endpoint = `${this.serviceUrl}/sub/:projectId/:subId`.replace(':subId', subId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }

  // Pool

  getPools(projectId: string): Observable<Pool[]> {
    const endpoint = `${this.url}/pool/:projectId`.replace(':projectId', projectId);
    return this.http.get<Pool[]>(endpoint, { withCredentials: true });
  }
  
  createPool(projectId: string, pool: Pool): Observable<Pool> {
    const endpoint = `${this.url}/pool/:projectId`.replace(':projectId', projectId);
    return this.http.post<Pool>(endpoint, { pool }, { withCredentials: true });
  }
  
  updatePool(projectId: string, pool: Pool): Observable<Pool> {
    const endpoint = `${this.url}/pool/:projectId`.replace(':projectId', projectId);
    return this.http.put<Pool>(endpoint, { pool }, { withCredentials: true });
  }
  
  deletePool(projectId: string, poolId: string): Observable<ResponseMessage> {
    const endpoint = `${this.url}/pool/:projectId/:poolId`.replace(':poolId', poolId).replace(':projectId', projectId);
    return this.http.delete<ResponseMessage>(endpoint, { withCredentials: true });
  }
}
