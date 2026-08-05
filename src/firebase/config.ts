import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkROWKUW98mQR8dYgAaxElUnbHMa2x99Q",
  authDomain: "themonkey-sweb.firebaseapp.com",
  projectId: "themonkey-sweb",
  storageBucket: "themonkey-sweb.firebasestorage.app",
  messagingSenderId: "959969178250",
  appId: "1:959969178250:web:fb7c3748112846907db373"
  /*measurementId: "G-DS9Y6RYK4J" */
};



// Initialize Firebase
/*const app = initializeApp(firebaseConfig);*/
/*const analytics = getAnalytics(app);*/

const app = initializeApp(firebaseConfig);
//export const db = getFirestore(app);
//export const storage = getStorage(app);

// Exportar servicios
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;