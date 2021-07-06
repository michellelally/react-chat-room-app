import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC79wGmZB4dl7MRdBizB-yZogmcZLkgjWE",
  authDomain: "react-chat-app-9dbf7.firebaseapp.com",
  projectId: "react-chat-app-9dbf7",
  storageBucket: "react-chat-app-9dbf7.appspot.com",
  messagingSenderId: "774707000046",
  appId: "1:774707000046:web:de486b4d69e3b5df8d79ff"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  return (
    <div className="App">
      <header className="App-header">
 
      </header>
    </div>
  );
}

export default App;
