import { SET_GLLM, SET_SHEET, SET_PRODUCT } from "./constants";

export const initState = {
    gllm: [],
    sheet: [],
    activeProduct: {
        list: null,
        product: null,
        fileName: null,
        hAll: 1200,
        wAll: 2400,
        localFile: []
    }

}


function reducer(state, action) {
    switch (action.type) {
        case SET_GLLM:
            return {
                ...state,
                gllm: action.payload
            }

        case SET_SHEET:
            return {
                ...state,
                sheet: action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                activeProduct: { ...state.activeProduct, ...action.payload }
            }
        default:
            throw console.log("invalid action", action);
    }

}

export default reducer