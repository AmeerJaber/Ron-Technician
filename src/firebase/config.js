import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Axios from 'axios'

export const firebaseConfig = {    apiKey: "AIzaSyBhqB433RalE7Y4bhTuaGLgekzi0rheE4s",
authDomain: "rontechnician-68174.firebaseapp.com",
projectId: "rontechnician-68174",
storageBucket: "rontechnician-68174.appspot.com",
messagingSenderId: "904671932728",
appId: "1:904671932728:web:b0b864b4358e6c94e611cd",
measurementId: "G-SX0S9RB69H"};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { Axios, db }