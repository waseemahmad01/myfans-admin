import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import {
  getFirestore,
  getDocs,
  collection,
  // addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDGQWg0vrTdjsBdKGHuQDlaSgEF8oqGL0Q",
  authDomain: "my-fans-678b2.firebaseapp.com",
  projectId: "my-fans-678b2",
  storageBucket: "my-fans-678b2.appspot.com",
  messagingSenderId: "264539800652",
  appId: "1:264539800652:web:c8215f638f7f0ac5e060e9",
  measurementId: "G-4SWJ096FB8",
};

// Initialize Firebase
export const fire = initializeApp(firebaseConfig);
export const db = getFirestore(fire);
export const cloudStorage = getStorage(fire);
export const messaging = getMessaging(fire);
export const getData = async (col) => {
  const snapshot = await getDocs(collection(db, col));
  const data = snapshot.docs.map((doc) => {
    const item = {
      // id: doc.id,
      ...doc.data(),
    };
    return item;
  });
  return data;
};
export const setItem = async (col, item) => {
  try {
    const ref = doc(collection(db, col));
    let document = { ...item };
    document.uid = ref.id;
    // console.log(document);
    await setDoc(ref, document);
  } catch (err) {
    console.log(err);
  }
};
export const uploadImage = async (file, address) => {
  const docRef = ref(cloudStorage, address);
  await uploadBytes(docRef, file);
  const URL = await getDownloadURL(docRef);
  return URL;
};
export const updateImage = async (file, old, newAddress) => {
  // console.log(old);
  const docRef = ref(cloudStorage, old);
  await deleteObject(docRef);
  const newRef = ref(cloudStorage, newAddress);
  await uploadBytes(newRef, file);
  const URL = await getDownloadURL(newRef);
  return URL;
};
export const updateItem = async (col, id, item) => {
  try {
    // eslint disable next line
    const data = await setDoc(doc(db, col, id), item, { merge: true });
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
};
export const deleteItem = async (col, id) => {
  try {
    const data = await deleteDoc(doc(db, col, id));
  } catch (err) {
    console.log(err);
  }
};
