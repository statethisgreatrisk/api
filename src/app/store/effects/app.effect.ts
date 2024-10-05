import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AppRequest } from "../requests/app.request";
import { getUser, addUser, requestError, addAPI, addAPIs, createAPI, deleteAPI, getAPIs, removeAPI, replaceAPI, updateAPI, addStorage, addStorages, createStorage, deleteStorage, getStorages, removeStorage, replaceStorage, updateStorage, addSchema, addSchemas, createSchema, deleteSchema, getSchemas, removeSchema, replaceSchema, updateSchema, addValidator, addValidators, createValidator, deleteValidator, getValidators, removeValidator, replaceValidator, updateValidator, addWorkflow, addWorkflows, createWorkflow, deleteWorkflow, getWorkflows, removeWorkflow, replaceWorkflow, updateWorkflow, getApps, addApps, addBilling, addBillings, addDeploy, addDeploys, addKey, addKeys, addLog, addLogs, addUsage, addUsages, createBilling, createDeploy, createKey, createLog, createUsage, getBillings, getDeploys, getKeys, getLogs, getUsages, replaceBilling, replaceDeploy, replaceKey, replaceLog, replaceUsage, updateBilling, updateDeploy, updateKey, updateLog, updateUsage, signupUser, authError, authSuccess, resendUser, confirmUser, forgotUser, resetUser, loginUser, logoutUser, refreshUser, checkUser, addProject, addProjects, createProject, deleteProject, getProjects, removeProject, replaceProject, updateProject, deleteKey, removeKey, billingError, billingSuccess, deployStartSuccess, deployStartError, deployStopSuccess, deployStopError, addFn, addFns, addObj, addObjs, createFn, createObj, deleteFn, deleteObj, getFns, getObjs, removeFn, removeObj, replaceFn, replaceObj, updateFn, updateObj, addDocument, addDocuments, createDocument, deleteDocument, getDocuments, removeDocument, replaceDocument, updateDocument, addSub, addSubs, createSub, deleteSub, getSubs, removeSub, replaceSub, updateSub } from "../actions/app.action";

@Injectable()
export class AppEffect {
    constructor(private actions$: Actions, private appRequest: AppRequest) {}

    // User

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUser),
            exhaustMap((action) => this.appRequest.getUser().pipe(
                map(data => addUser({ user: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // App

    getApps$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getApps),
            exhaustMap((action) => this.appRequest.getApps().pipe(
                map(data => addApps({ apps: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Auth

    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupUser),
            exhaustMap((action) => this.appRequest.authSignup(action.email, action.password).pipe(
                map(data => authSuccess({ action: 'signup', success: true, message: data })),
                catchError(err => of(authError({ action: 'signup', success: false, message: err.error })))
            )),
        );
    });

    authResend$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(resendUser),
            exhaustMap((action) => this.appRequest.authResend(action.email).pipe(
                map(data => authSuccess({ action: 'resend', success: true, message: data })),
                catchError(err => of(authError({ action: 'resend', success: false, message: err.error })))
            )),
        );
    });

    authConfirm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(confirmUser),
            exhaustMap((action) => this.appRequest.authConfirm(action.email, action.confirmationCode).pipe(
                map(data => authSuccess({ action: 'confirm', success: true, message: data })),
                catchError(err => of(authError({ action: 'confirm', success: false, message: err.error })))
            )),
        );
    });

    authForgot$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(forgotUser),
            exhaustMap((action) => this.appRequest.authForgot(action.email).pipe(
                map(data => authSuccess({ action: 'forgot', success: true, message: data })),
                catchError(err => of(authError({ action: 'forgot', success: false, message: err.error })))
            )),
        );
    });

    authReset$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(resetUser),
            exhaustMap((action) => this.appRequest.authReset(action.email, action.password, action.confirmationCode).pipe(
                map(data => authSuccess({ action: 'reset', success: true, message: data })),
                catchError(err => of(authError({ action: 'reset', success: false, message: err.error })))
            )),
        );
    });

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginUser),
            exhaustMap((action) => this.appRequest.authLogin(action.email, action.password).pipe(
                map(data => authSuccess({ action: 'login', success: true, message: data })),
                catchError(err => of(authError({ action: 'login', success: false, message: err.error })))
            )),
        );
    });

    authRefresh$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(refreshUser),
            exhaustMap((action) => this.appRequest.authRefresh().pipe(
                map(data => authSuccess({ action: 'refresh', success: true, message: data })),
                catchError(err => of(authError({ action: 'refresh', success: false, message: err.error })))
            )),
        );
    });

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logoutUser),
            exhaustMap((action) => this.appRequest.authLogout(action.email).pipe(
                map(data => authSuccess({ action: 'logout', success: true, message: data })),
                catchError(err => of(authError({ action: 'logout', success: false, message: err.error })))
            )),
        );
    });

    authCheck$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkUser),
            exhaustMap((action) => this.appRequest.authCheck().pipe(
                map(data => authSuccess({ action: 'check', success: true, message: data })),
                catchError(err => of(authError({ action: 'check', success: false, message: err.error })))
            )),
        );
    });

    // Project

    getProjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProjects),
            exhaustMap((action) => this.appRequest.getProjects().pipe(
                map(data => addProjects({ projects: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createProject),
            exhaustMap((action) => this.appRequest.createProject(action.project).pipe(
                map(data => addProject({ project: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProject),
            exhaustMap((action) => this.appRequest.updateProject(action.projectId, action.project).pipe(
                map(data => replaceProject({ project: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteProject),
            exhaustMap((action) => this.appRequest.deleteProject(action.projectId).pipe(
                map(data => removeProject({ projectId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // API

    getAPIs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAPIs),
            exhaustMap((action) => this.appRequest.getAPIs(action.projectId).pipe(
                map(data => addAPIs({ apis: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createAPI),
            exhaustMap((action) => this.appRequest.createAPI(action.projectId, action.api).pipe(
                map(data => addAPI({ api: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateAPI),
            exhaustMap((action) => this.appRequest.updateAPI(action.projectId, action.api).pipe(
                map(data => replaceAPI({ api: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteAPI),
            exhaustMap((action) => this.appRequest.deleteAPI(action.projectId, action.apiId).pipe(
                map(data => removeAPI({ apiId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Storage

    getStorages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getStorages),
            exhaustMap((action) => this.appRequest.getStorages(action.projectId).pipe(
                map(data => addStorages({ storages: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createStorage),
            exhaustMap((action) => this.appRequest.createStorage(action.projectId, action.storage).pipe(
                map(data => addStorage({ storage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateStorage),
            exhaustMap((action) => this.appRequest.updateStorage(action.projectId, action.storage).pipe(
                map(data => replaceStorage({ storage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteStorage),
            exhaustMap((action) => this.appRequest.deleteStorage(action.projectId, action.storageId).pipe(
                map(data => removeStorage({ storageId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Schema

    getSchemas$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSchemas),
            exhaustMap((action) => this.appRequest.getSchemas(action.projectId).pipe(
                map(data => addSchemas({ schemas: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSchema),
            exhaustMap((action) => this.appRequest.createSchema(action.projectId, action.schema).pipe(
                map(data => addSchema({ schema: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateSchema),
            exhaustMap((action) => this.appRequest.updateSchema(action.projectId, action.schema).pipe(
                map(data => replaceSchema({ schema: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteSchema),
            exhaustMap((action) => this.appRequest.deleteSchema(action.projectId, action.schemaId).pipe(
                map(data => removeSchema({ schemaId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Validator

    getValidators$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getValidators),
            exhaustMap((action) => this.appRequest.getValidators(action.projectId).pipe(
                map(data => addValidators({ validators: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createValidator),
            exhaustMap((action) => this.appRequest.createValidator(action.projectId, action.validator).pipe(
                map(data => addValidator({ validator: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateValidator),
            exhaustMap((action) => this.appRequest.updateValidator(action.projectId, action.validator).pipe(
                map(data => replaceValidator({ validator: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteValidator),
            exhaustMap((action) => this.appRequest.deleteValidator(action.projectId, action.validatorId).pipe(
                map(data => removeValidator({ validatorId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Workflow

    getWorkflows$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getWorkflows),
            exhaustMap((action) => this.appRequest.getWorkflows(action.projectId).pipe(
                map(data => addWorkflows({ workflows: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createWorkflow),
            exhaustMap((action) => this.appRequest.createWorkflow(action.projectId, action.workflow).pipe(
                map(data => addWorkflow({ workflow: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateWorkflow),
            exhaustMap((action) => this.appRequest.updateWorkflow(action.projectId, action.workflow).pipe(
                map(data => replaceWorkflow({ workflow: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteWorkflow),
            exhaustMap((action) => this.appRequest.deleteWorkflow(action.projectId, action.workflowId).pipe(
                map(data => removeWorkflow({ workflowId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Fn

    getFns$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getFns),
            exhaustMap((action) => this.appRequest.getFns(action.projectId).pipe(
                map(data => addFns({ fns: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createFn),
            exhaustMap((action) => this.appRequest.createFn(action.projectId, action.fn).pipe(
                map(data => addFn({ fn: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateFn),
            exhaustMap((action) => this.appRequest.updateFn(action.projectId, action.fn).pipe(
                map(data => replaceFn({ fn: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteFn),
            exhaustMap((action) => this.appRequest.deleteFn(action.projectId, action.fnId).pipe(
                map(data => removeFn({ fnId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Obj

    getObjs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getObjs),
            exhaustMap((action) => this.appRequest.getObjs(action.projectId).pipe(
                map(data => addObjs({ objs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createObj),
            exhaustMap((action) => this.appRequest.createObj(action.projectId, action.obj).pipe(
                map(data => addObj({ obj: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateObj),
            exhaustMap((action) => this.appRequest.updateObj(action.projectId, action.obj).pipe(
                map(data => replaceObj({ obj: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteObj),
            exhaustMap((action) => this.appRequest.deleteObj(action.projectId, action.objId).pipe(
                map(data => removeObj({ objId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Document

    getDocuments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDocuments),
            exhaustMap((action) => this.appRequest.getDocuments(action.projectId).pipe(
                map(data => addDocuments({ documents: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDocument),
            exhaustMap((action) => this.appRequest.createDocument(action.projectId, action.document).pipe(
                map(data => addDocument({ document: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateDocument),
            exhaustMap((action) => this.appRequest.updateDocument(action.projectId, action.document).pipe(
                map(data => replaceDocument({ document: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteDocument),
            exhaustMap((action) => this.appRequest.deleteDocument(action.projectId, action.documentId).pipe(
                map(data => removeDocument({ documentId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Deploy

    getDeploys$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDeploys),
            exhaustMap((action) => this.appRequest.getDeploys(action.projectId).pipe(
                map(data => addDeploys({ deploys: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDeploy),
            exhaustMap((action) => this.appRequest.createDeploy(action.projectId, action.deploy).pipe(
                mergeMap((data) => [addDeploy({ deploy: data }), deployStartSuccess()]),
                catchError(err => of(deployStartError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateDeploy),
            exhaustMap((action) => this.appRequest.updateDeploy(action.projectId, action.deploy).pipe(
                mergeMap((data) => [replaceDeploy({ deploy: data }), deployStopSuccess()]),
                catchError(err => of(deployStopError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Log

    getLogs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getLogs),
            exhaustMap((action) => this.appRequest.getLogs(action.projectId).pipe(
                map(data => addLogs({ logs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createLog$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createLog),
            exhaustMap((action) => this.appRequest.createLog(action.projectId, action.log).pipe(
                map(data => addLog({ log: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateLog$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateLog),
            exhaustMap((action) => this.appRequest.updateLog(action.projectId, action.log).pipe(
                map(data => replaceLog({ log: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Key

    getKeys$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getKeys),
            exhaustMap((action) => this.appRequest.getKeys(action.projectId).pipe(
                map(data => addKeys({ keys: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createKey),
            exhaustMap((action) => this.appRequest.createKey(action.projectId, action.key).pipe(
                map(data => addKey({ key: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateKey),
            exhaustMap((action) => this.appRequest.updateKey(action.projectId, action.key).pipe(
                map(data => replaceKey({ key: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteKey),
            exhaustMap((action) => this.appRequest.deleteKey(action.projectId, action.keyId).pipe(
                map(data => removeKey({ keyId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Billing

    getBillings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getBillings),
            exhaustMap((action) => this.appRequest.getBillings(action.projectId).pipe(
                map(data => addBillings({ billings: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createBilling$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createBilling),
            exhaustMap((action) => this.appRequest.createBilling(action.projectId, action.billing).pipe(
                mergeMap((data) => [addBilling({ billing: data }), billingSuccess()]),
                catchError(err => of(billingError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateBilling$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateBilling),
            exhaustMap((action) => this.appRequest.updateBilling(action.projectId, action.billing).pipe(
                map(data => replaceBilling({ billing: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Usage

    getUsages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUsages),
            exhaustMap((action) => this.appRequest.getUsages(action.projectId).pipe(
                map(data => addUsages({ usages: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createUsage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createUsage),
            exhaustMap((action) => this.appRequest.createUsage(action.projectId, action.usage).pipe(
                map(data => addUsage({ usage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateUsage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateUsage),
            exhaustMap((action) => this.appRequest.updateUsage(action.projectId, action.usage).pipe(
                map(data => replaceUsage({ usage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Sub

    getSubs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSubs),
            exhaustMap((action) => this.appRequest.getSubs(action.projectId).pipe(
                map(data => addSubs({ subs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSub),
            exhaustMap((action) => this.appRequest.createSub(action.projectId, action.sub).pipe(
                map(data => addSub({ sub: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateSub),
            exhaustMap((action) => this.appRequest.updateSub(action.projectId, action.sub).pipe(
                map(data => replaceSub({ sub: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteSub),
            exhaustMap((action) => this.appRequest.deleteSub(action.projectId, action.subId).pipe(
                map(data => removeSub({ subId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
}
