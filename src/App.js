import firebase from './firebase/firebase';
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';
import { StoreContext } from "./store/store";
import './App.scss';

const App = () => {
  const userReducer = useContext(StoreContext).userReducer

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        let cruser = {
          id: user.uid,
          name: user.displayName
        }
        userReducer.dispatch({ type: 'set_user', payload: cruser })
        console.log("login11");
      } else {
        userReducer.dispatch({ type: 'remove_user' })
        console.log("sign out");
      }
    })

    // let cruser = getCurrentUser()
    // if (cruser) {
    //   userReducer.dispatch({ type: 'set_user', payload: cruser })
    //   const database = firebase.database()

    //   database.ref('users/' + cruser.id).onDisconnect()
    //     .set({ ...cruser, online: false })
    //     .then(() => {
    //       database.ref('users/' + cruser.id).set({ ...cruser, online: true })
    //     })
    // } else {
    //   localStorage.removeItem("user")
    // }
  }, [])

  return (
    <div className="App container">
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/rooms/:id"><Room /></Route>
      </Switch>
    </div>
  );
}

export default App;
