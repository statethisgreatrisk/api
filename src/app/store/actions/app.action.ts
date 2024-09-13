import { createAction, props } from "@ngrx/store";

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ error: any }>());
