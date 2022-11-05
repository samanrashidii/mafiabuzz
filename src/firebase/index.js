import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcLy0_vuAXR_U4c9sBcp-tXa0S-5YQxpE',
  authDomain: 'mafia-buzz.firebaseapp.com',
  databaseURL: 'https://mafia-buzz.firebaseio.com',
  projectId: 'mafia-buzz',
  storageBucket: 'mafia-buzz.appspot.com',
  messagingSenderId: '588985641222',
  appId: '1:588985641222:web:ba0deef46969723f9d1687'
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const asd = ref(db, 'collection', 'characters')

console.log(asd)