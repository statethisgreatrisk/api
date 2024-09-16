import { createAction, props } from "@ngrx/store";
import { API, Schema, Storage, User, Validator } from "../interfaces/app.interface";

export const getUser = createAction('[GET] User', props<{userId: string}>());
export const addUser = createAction('[ADD] User', props<{user: User}>());

// API
export const getAPIs = createAction('[GET] APIs', props<{userId: string}>());
export const addAPIs = createAction('[ADD] APIs', props<{apis: API[]}>());
export const createAPI = createAction('[CREATE] API', props<{userId: string, api: API}>());
export const addAPI = createAction('[ADD] API', props<{api: API}>());
export const updateAPI = createAction('[UPDATE] API', props<{userId: string, api: API}>());
export const replaceAPI = createAction('[REPLACE] API', props<{api: API}>());
export const deleteAPI = createAction('[DELETE] API', props<{userId: string, apiId: string}>());
export const removeAPI = createAction('[REMOVE] API', props<{apiId: string}>());

// Storage
export const getStorages = createAction('[GET] Storages', props<{userId: string}>());
export const addStorages = createAction('[ADD] Storages', props<{storages: Storage[]}>());
export const createStorage = createAction('[CREATE] Storage', props<{userId: string, storage: Storage}>());
export const addStorage = createAction('[ADD] Storage', props<{storage: Storage}>());
export const updateStorage = createAction('[UPDATE] Storage', props<{userId: string, storage: Storage}>());
export const replaceStorage = createAction('[REPLACE] Storage', props<{storage: Storage}>());
export const deleteStorage = createAction('[DELETE] Storage', props<{userId: string, storageId: string}>());
export const removeStorage = createAction('[REMOVE] Storage', props<{storageId: string}>());

// Schema
export const getSchemas = createAction('[GET] Schemas', props<{userId: string}>());
export const addSchemas = createAction('[ADD] Schemas', props<{schemas: Schema[]}>());
export const createSchema = createAction('[CREATE] Schema', props<{userId: string, schema: Schema}>());
export const addSchema = createAction('[ADD] Schema', props<{schema: Schema}>());
export const updateSchema = createAction('[UPDATE] Schema', props<{userId: string, schema: Schema}>());
export const replaceSchema = createAction('[REPLACE] Schema', props<{schema: Schema}>());
export const deleteSchema = createAction('[DELETE] Schema', props<{userId: string, schemaId: string}>());
export const removeSchema = createAction('[REMOVE] Schema', props<{schemaId: string}>());

// Validator
export const getValidators = createAction('[GET] Validators', props<{userId: string}>());
export const addValidators = createAction('[ADD] Validators', props<{validators: Validator[]}>());
export const createValidator = createAction('[CREATE] Validator', props<{userId: string, validator: Validator}>());
export const addValidator = createAction('[ADD] Validator', props<{validator: Validator}>());
export const updateValidator = createAction('[UPDATE] Validator', props<{userId: string, validator: Validator}>());
export const replaceValidator = createAction('[REPLACE] Validator', props<{validator: Validator}>());
export const deleteValidator = createAction('[DELETE] Validator', props<{userId: string, validatorId: string}>());
export const removeValidator = createAction('[REMOVE] Validator', props<{validatorId: string}>());

export const selectService = createAction('[SELECT] Service', props<{ serviceName: string, serviceDataId: string }>());

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ error: any }>());
