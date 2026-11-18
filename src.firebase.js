import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCjM-Q5un-r4_0i9tgLuOuMprExdHscXBU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'forney-aquatics.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'forney-aquatics',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'forney-aquatics.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '517869009239',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:517869009239:web:0177f242c6c2375b506612'
};
export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
