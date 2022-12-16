import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD-4rzrhWYF0ZVcsUkMvIvXZvz_R5gzvjM",
    authDomain: "restaurantapp-354f5.firebaseapp.com",
    databaseURL: "https://restaurantapp-354f5-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-354f5",
    storageBucket: "restaurantapp-354f5.appspot.com",
    messagingSenderId: "196248845639",
    appId: "1:196248845639:web:92cb66076835f95be1a062"
  };
  
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app ,firestore , storage}