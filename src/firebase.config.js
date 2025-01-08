import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDQ015gAwI93APjXWKFzBEt8s9OfX34RA4",
  authDomain: "karina-super-fruits.firebaseapp.com",
  databaseURL: "https://karina-super-fruits-default-rtdb.firebaseio.com",
  projectId: "karina-super-fruits",
  storageBucket: "karina-super-fruits.appspot.com",
  messagingSenderId: "1095104198724",
  appId: "1:1095104198724:web:81af0c32477921a10ae411",
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };