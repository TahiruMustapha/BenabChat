// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "benabchat.firebaseapp.com",
  projectId: "benabchat",
  storageBucket: "benabchat.appspot.com",
  messagingSenderId: "828023573552",
  appId: "1:828023573552:web:601826724428e40836f1f5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 2 * 1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
//       }
//     }
//   }
