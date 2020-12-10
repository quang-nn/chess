import firebase from './firebase/firebase';
import "firebase/database";
import "firebase/firestore";
import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


const App = () => {
  const inputRef = useRef();

  const but = () => {
    console.log(inputRef.current.value);
    // initModel()
    // var roomListRef = firebase.database().ref("rooms")
    // var newRoomRef = roomListRef.push();
    // newRoomRef.set({
    //   username: "my name"
    // });
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.name.value);
    console.log(e.target.room.value);
  }

  const initModel = () => {
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")
    var users = firestore.collection("users")

    rooms.doc().set({ active: true, userIds: [] })
    users.doc().set({ active: true })
  }

  useEffect(() => {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseConfig)
    // }
    // eslint-disable-next-line
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
