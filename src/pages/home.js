import { Link, useHistory } from 'react-router-dom';
import firebase from './../firebase/firebase';
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { StoreContext } from '../store/store';
import { initState } from '../canvas/init';

const Home = () => {
  const history = useHistory()
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])

  const userReducer = useContext(StoreContext).userReducer
  const crUser = userReducer.state.user

  const onSubmit = (e) => {
    e.preventDefault()
    let name = e.target.name.value;

    let newUser = {
      name: name,
      online: true
    }

    if (crUser)
      newUser = { ...newUser, id: crUser.id }
    else
      newUser = { ...newUser, id: uuidv4() }


    // firebase.database().ref('users/' + newUser.id).set(newUser, (err) => {
    //   if (!err) {
    //     userReducer.dispatch({ type: 'set_user', payload: newUser })
    //   }
    // })
    // console.log(firebase.auth().currentUser);
    firebase.auth().signInAnonymously()
      .then((res) => {
        console.log(res);
        res.user.updateProfile({ displayName: name })
          .then(() => {
            let cruser = {
              id: res.user.uid,
              name: name
            }
            userReducer.dispatch({ type: 'set_user', payload: cruser })
          })
      })
      .catch((err) => {
        console.log(err);
      })
    e.target.name.value = ""
  }

  const onLogOut = () => {
    var user = firebase.auth().currentUser;
    user.delete()
  }

  const onCreateRoom = () => {
    console.log(initState);
    const firestore = firebase.firestore()
    firestore.collection("rooms").add({
      name: `room${rooms.length + 1}`,
      users: [crUser],
      state: JSON.stringify(initState),
      gameState: { turn: 1, isSelecting: false, selectingChess: null, from: null, to: null }
    })
      .then((doc) => {
        history.push(`/rooms/${doc.id}`)
      })
  }

  useEffect(() => {
    const firestore = firebase.firestore()
    const database = firebase.database()

    var rooms = firestore.collection("rooms")
    rooms.onSnapshot(res => {
      let rooms = res.docs.map(x => ({ ...x.data(), id: x.id }))
      setRooms(rooms)
    })

    database.ref('users').on('value', (snapshot) => {
      if (snapshot.val())
        setUsers(Object.values(snapshot.val()));
      else
        setUsers([])
    })
  }, [])

  return (
    <div>
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          Name: <input name="name" />
          <button type="submit">Join us</button>
        </form>
        <p>your name is : {crUser?.name}</p>
      </div>
      {crUser &&
        <div>
          <button onClick={() => onLogOut()}>Logout</button><br />
          <button onClick={() => onCreateRoom()}>Create Room</button>
          <p>Available rooms:</p>
          <ul>
            {rooms.map((val, key) => {
              return <li key={key}>
                <Tooltip title={val.id}>
                  <Link to={`rooms/${val.id}`}>{val.name} </Link>
                </Tooltip>
              </li>
            })}
          </ul>
        </div>
      }
      <div>
        <p>Available users:</p>
        <ul>
          {users.map((user, key) => {
            return <li key={key}><p>{user.name}, online: {user?.online.toString()}</p></li>
          })}
        </ul>
      </div>
    </div >
  );
};

export default Home;