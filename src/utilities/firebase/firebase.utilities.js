// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-OQeVPilRa4aXmFVsgEeoilvz4sB0JSI",
  authDomain: "plus-minus-one-db.firebaseapp.com",
  projectId: "plus-minus-one-db",
  storageBucket: "plus-minus-one-db.appspot.com",
  messagingSenderId: "466231838225",
  appId: "1:466231838225:web:e90011e9df5f28f6b2d3b0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  Array.from(objectsToAdd).forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocReference = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocReference);

  // if user does not exist, create it
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocReference, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocReference;
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const catergoriesMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;

    return acc
  }, {});

  return catergoriesMap;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
