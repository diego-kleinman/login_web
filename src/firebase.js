import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyBvOJgnE9OTDl3qBydeZfTpKczIHK2uAUk",
    authDomain: "login-app-a4605.firebaseapp.com",
    projectId: "login-app-a4605",
    storageBucket: "login-app-a4605.appspot.com",
    messagingSenderId: "544843064621",
    appId: "1:544843064621:web:1af43ff7a43ae6f6995fa4"
};

app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db, auth}