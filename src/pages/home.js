import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { firebaseConfig } from '../constants/firebaseConfig';
import "firebase/firestore";
import { useEffect, useState } from 'react';

const Home = () => {
  const history = useHistory()
  const [rooms, setRooms] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    let name = e.target.name.value;
    let room = e.target.room.value;
    history.push(`/room/${room}`)
  }

  useEffect(() => {
    const firestore = firebase.firestore()
    var rooms = firestore.collection("rooms")
    rooms.onSnapshot(res => {
      let rooms = res.docs.map(x => ({ ...x.data(), id: x.id }))
      console.log(rooms);
      setRooms(rooms)
    })
  }, [])

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        Name: <input name="name" /><br />
        {/* Rooms: <input name="room" /><br /> */}
        <button type="submit">Create Room</button>
      </form>
      <div>
        <p>Available rooms:</p>

        {rooms.map((val, key) => {
          return <Link key={key} to={`rooms/${val.id}`}>{val.name} </Link>
        })}
      </div>
    </div >
  );
};

export default Home;