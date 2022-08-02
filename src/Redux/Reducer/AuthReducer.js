/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    auth: false,
    msg: '',
    user: {},
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          user: action.user
        };
  
     
      default: return state
    }
  }
  