import { useReducer } from 'react';

const initialState = {
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_user':
      // console.log(action);
      // localStorage.setItem("user", JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
    case 'remove_user':
      // localStorage.removeItem("user");
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const useUserReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch }
}

export default useUserReducer;