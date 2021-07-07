import './App.css';
import React, { useRef, useState } from 'react';

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

// useAuthState hook - can tell if a user is signed in or not
// if user is logged in, returns an object with id and email address
// if logged out, user object is null

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chat</h1>
        <SignOut />
      </header>

      <section>
        { user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {

    // initializing a GoogleAuthProvider
    const provider = new firebase.auth.GoogleAuthProvider();
    // triggers a popup window
    auth.signInWithPopup(provider);
  }

  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button className="sign-out" onClick={ () => auth.signOut}>Sign Out</button>

  )
}

function ChatRoom() {

  const dummy = useRef(); 

  // querying a subset of documents called messages
  const messagesRef = firestore.collection('messages');
  // ordering them by the time they were created at lmiting at 25
  const query = messagesRef.orderBy('createdAt').limit(25);

  // listening to any updates in realtime wiht useCollectionData hook
  // returns an array of objects
  // each object is the chat message in the database
  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {

    e.preventDefault();

    const { uid, photoURL} = auth.currentUser; 

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth'});

  }

  return (
    <>
    <div>
      <div>
      {/*
        mapping over the array of messages using a ChatMessage component for each message
        it passes the key prop with the value of id and document data as a message prop
      */}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
      </div>
      <div ref={dummy}></div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit">💩</button>
      </form>

    </div>
    </>
  )

}

function ChatMessage(props) {

  const { text, uid, photoURL } = props.message;
  // distinguish between sent and recieved messages 
  // by comparing the user id on firestore document with the logged in user
  const messageClass = uid === auth.currentUser.uid;

return (
  <div className={'message ${messageClass}'}>
    <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
    <p>{text}</p>

  </div>

)
}

export default App;
