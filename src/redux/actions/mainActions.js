import { SET_LOADING, SET_NOTIFICATION } from "../type"

export const mainAction = {
    setPair: (contract, wallet, key, value) => async (dispatch) => {
        try {
            dispatch({ type: SET_LOADING, payload: true })
            await contract.methods.setPair(key, value).send({ from: wallet })
            dispatch({ type: SET_LOADING, payload: false })
            dispatch({ type: SET_NOTIFICATION, payload: { type: 'success', text: 'Succeeded in saving', status: true } })
        } catch (err) {
            console.log(err)
            dispatch({ type: SET_NOTIFICATION, payload: { type: 'error', text: 'Failed in saving', status: true } })
            dispatch({ type: SET_LOADING, payload: false })
        }

    }
}