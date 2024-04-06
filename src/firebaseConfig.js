
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "benabchat.firebaseapp.com",
  projectId: "benabchat",
  storageBucket: "benabchat.appspot.com",
  messagingSenderId: "828023573552",
  appId: "1:828023573552:web:601826724428e40836f1f5",
};

export const app = initializeApp(firebaseConfig);

