import React, { useState } from "react";
import EventDetail from './EventDetail'
import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import firebase from 'firebase/app';
import 'firebase/database';

export const apiKey =
    'bWKtDZgaFdt5Zq-srgXTP_nLbhQuHA4kNw0Y8tH0GOIB8bCJsK2KgAW0epvwAhu6YJUD9CN-VG-96IOUhD9sHm_t69ZpPR_HoLnEeXgAdv_IZ-mtX67a4ftZK8GkXXYx';

const firebaseConfig = {
  apiKey: "AIzaSyCF8hw3_HjWCv6Z7n7vzJXeyNR4OKWzxEU",
  authDomain: "what2eat-266ce.firebaseapp.com",
  databaseURL: "https://what2eat-266ce.firebaseio.com",
  projectId: "what2eat-266ce",
  storageBucket: "what2eat-266ce.appspot.com",
  messagingSenderId: "681623133231",
  appId: "1:681623133231:web:841fac42ae6d01f2577ada",
  measurementId: "G-NTC7JFZZGW"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default function Dashboard() {
  const [hasId, setHasId] = useState(localStorage.getItem('renderSurvey'));

  const handleCreatingEvent = () => {
    //creating new events in firebase
    const id = Math.random().toString(36).substr(2, 9)
    alert('Success! Your Event Id is, ' + id)

    db.ref('events/' + id).set({
      location: "",
    })
    db.ref('events/' + id).child('cuisine').set({
      Pizza: 0,
      Chinese: 0,
      Mexican: 0,
      Thai: 0,
      Seafood: 0,
      Italian: 0,
      Korean: 0
    })

    db.ref('events/' + id).child('price').set({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
    })

    localStorage.setItem('renderSurvey', true)
    setHasId(true);
  }

  const handleBackClick = () => {
    localStorage.setItem('renderSurvey', false)
    setHasId(false);
  }

  if (!hasId) {
    return <Button color='rose' onClick={handleCreatingEvent}>Create New Event</Button>
  } else {
    return (
      <div>
        <IconButton onClick={handleBackClick}><ArrowBackIcon/></IconButton>
        <EventDetail id="12345678"/>
      </div>)
  }


}