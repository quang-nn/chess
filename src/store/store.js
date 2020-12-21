import { createContext } from 'react';
import useUserReducer from '../reducers/userReducer';

const StoreProvider = (props) => {
  const userReducer = useUserReducer();

  const store = {
    userReducer: userReducer,
  }

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;

export const StoreContext = createContext(null);