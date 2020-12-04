import firebase from 'firebase/app';
import { firebaseConfig } from '../constants/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase