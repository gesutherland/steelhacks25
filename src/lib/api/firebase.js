import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const user = writable(null);

auth.onAuthStateChanged(u => {
  user.set(u);
});

export const getUser = () => new Promise(res => {
  const unsub = user.subscribe(u => {
    if (u) {
      res(u);
      unsub();
    }
  });
});

export const login = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}