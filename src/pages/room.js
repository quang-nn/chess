import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/firestore";
import Game from '../canvas/game';
import { StoreContext } from '../store/store';
import { initState } from "./../canvas/init";
import { jsonToChess } from '../canvas/helper';

const Room = () => {
  const params = useParams()
  const [room, setRoom] = useState(null)
  const [usersInRoom, setUsersInRoom] = useState([])
  const [state, setState] = useState([])
  const [gameState, setGameState] = useState([])

  const userReducer = useContext(StoreContext).userReducer
  const crUser = userReducer.state.user

  const onReset = () => {

  }

  const updateGameState = (val) => {
    setGameState(val)
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")
    rooms.doc(params.id).set({ gameState: val }, { merge: true })
  }

  const updateState = (val) => {
    setState(val)
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")
    rooms.doc(params.id).set({ state: JSON.stringify(val) })
  }

  useEffect(() => {
    if (crUser) {
      firebase.firestore().collection("rooms").doc(params.id).collection("users").doc(crUser.id).set(crUser)
    }
  }, [crUser])

  useEffect(() => {
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")

    rooms.doc(params.id).onSnapshot(res => {
      let room = { ...res.data(), id: res.id }
      setRoom(room)
      console.log(JSON.parse(room.state));

      let chessList = JSON.parse(room.state)
      console.log(crUser);
      // if (crUser?.name === "thoai")
      //   chessList.reverse()
      setState(chessList.map(x => x.map(y => jsonToChess(y))))
    })

    rooms.doc(params.id).collection("users").onSnapshot(res => {
      let users = res.docs.map(x => x.data())
      setUsersInRoom(users)
    })

    return () => {
      console.log("clear room");
    }
    // eslint-disable-next-line
  }, [])

  if (!room) return <div>loading...</div>
  return (
    <div className="row">
      <div className="col">
        <Game state={state} gameState={gameState} updateGameState={(val) => updateGameState(val)} updateState={(val) => updateState(val)}></Game>
      </div>
      <div className="col">
        <button onClick={() => onReset()}>Reset</button>
        <p>you are: {crUser?.name}</p>
        <p>room id: {room.id}</p>
        <p>room name: {room.name}</p>
        <p>User in room:</p>
        <ul>
          {usersInRoom.map((user, i) => {
            return <li key={i}>{user.name}</li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default Room;