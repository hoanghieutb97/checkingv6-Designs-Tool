import { SET_GLLM, SET_SHEET, SET_PRODUCT, SET_GLLMUS } from './constants';
    export const dispatchGLLM = payload => ({
        type: SET_GLLM,
        payload
    })
export const dispatchGLLMUS = payload => ({
    type: SET_GLLMUS,
    payload
})
export const dispatchSheet = payload => ({
    type: SET_SHEET,
    payload
})
export const dispatchProduct = payload => ({
    type: SET_PRODUCT,
    payload
})