import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';

import {FirebaseConfig} from '../config/keys';
firebase.initializeApp(FirebaseConfig)

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos")

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    console.log(userRef)
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    

    try {
        await userRef.set({
            displayName, 
            email,
            createdAt,
            ...additionalData
        })

    } catch (error) {
        console.log('error creating user', error.message);
    }
}

return userRef;
};


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;