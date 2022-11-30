import * as actionTypes from '../type'

const INITIAL_STATE = {
  loading: false,
  notification: {
    text: '',
    type: '',
    status: false
  }
}

const mainReducer = (state = INITIAL_STATE, action) => {
  const { payload = null } = action
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: payload
      }
    case actionTypes.SET_NOTIFICATION_INITIAL: 
      return {
        ...state,
        notification: {
          text: '',
          type: '',
          status: false
        }
      }
    default:
      return state
  }
}

export default mainReducer