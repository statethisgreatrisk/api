import { createAction, props } from "@ngrx/store";

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ error: any }>());

export const selectService = createAction('[SELECT] Service', props<{ name: string }>());

export const selectServiceData = createAction('[SELECT] Service Data', props<{ serviceDataId: string }>());
export const deselectServiceData = createAction('[DESELECT] Service Data');
