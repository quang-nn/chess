import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/firestore";
import Game from '../canvas/game';

const Room = () => {
  const params = useParams()
  console.log(params);
  const [room, setRoom] = useState(null)

  useEffect(() => {
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")
    rooms.doc(params.id).onSnapshot(res => {
      let room = { ...res.data(), id: res.id }
      // console.log(room);
      setRoom(room)
    })
  }, [])

  if(!room) return <div>loading...</div>
  return (
    <div>
      this is room: {room.name} with id: {room.id} <br />
      <Game />
    </div>
  );
};

export default Room;