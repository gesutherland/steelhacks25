import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable, get } from "svelte/store";
import { getFirestore, query, where } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_REALTIME_DB_URL
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const user = writable(null);
export const db = getFirestore(app);
export const database = getDatabase(app);

export const selectedPatient = writable(null);

auth.onAuthStateChanged(u => {
  user.set(u);
});

export const signout = () => {
  signOut(auth);
}

export const getPatientNameFromID = async (uid) => {
  let d = await getDoc(doc(db, "medical-profile", uid));
  if (!d.exists()) return;
  let p = d.data().form.personal;
  return p.firstName + " " + p.lastName;
}

export const getDoctorEmailFromID = async (uid) => {
  let d = await getDoc(doc(db, "users", uid));
  return d.data().email;
}

export const isPatient = () => new Promise((res) => {
  getUser().then(u => {
      getDoc(doc(db, "users", u.uid)).then(docSnap => {
        res(docSnap.data().userType == "patients")
      });
  })
})

export const sendPatientInfo = async (data) => {
  let u = await getUser();
  await setDoc(doc(db, "medical-profile", u.uid), data);
}

export const addChatMessage = async (message, messagesRef) => {
  let uid = get(user).uid;
  set(push(messagesRef), (await isPatient() ? "Patient:\n" : "Provider:\n") + message );
}

export const getUser = () => {
  return new Promise((res) => {
    let unsub = auth.onAuthStateChanged(u => {
      if (u) {
        res(u);
        unsub();
      }
    });
  })
} 

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((u) => {
      console.log(u.user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export const signup = (email, password, setUserType) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (u) => {
      await setDoc(doc(db, "users", u.user.uid), {
        userType: setUserType,
        email: email
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}