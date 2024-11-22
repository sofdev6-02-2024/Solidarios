// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCRzZwWzuotBS7MSTRv-uu-ek0q4CmQyR8',
  authDomain: 'cevent-16690.firebaseapp.com',
  projectId: 'cevent-16690',
  storageBucket: 'cevent-16690.firebasestorage.app',
  messagingSenderId: '841678103843',
  appId: '1:841678103843:web:39d520159bf3ba04669896',
  measurementId: 'G-P0528JMW1B'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);