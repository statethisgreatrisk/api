import { createAction, props } from "@ngrx/store";

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ error: any }>());

export const selectService = createAction('[SELECT] Service', props<{ serviceName: string, serviceDataId: string }>());
