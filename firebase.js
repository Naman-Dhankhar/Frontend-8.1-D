import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBoU5kyEo7JtYFvPR1FxamIbPy8rIKqFwM",
  authDomain: "frontend8-1d.firebaseapp.com",
  databaseURL: "https://frontend8-1d-default-rtdb.firebaseio.com",
  projectId: "frontend8-1d",
  storageBucket: "frontend8-1d.appspot.com",
  messagingSenderId: "844756042952",
  appId: "1:844756042952:web:89283a38942c177bbf11fd"
};

// Initialize Firebase with the config object
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
