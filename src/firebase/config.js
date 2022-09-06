import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAk8S1T8kM3QnO8_kTxoF1WeY0FlrD5_1c',
    authDomain: 'ecommer-ae881.firebaseapp.com',
    projectId: 'ecommer-ae881',
    storageBucket: 'ecommer-ae881.appspot.com',
    messagingSenderId: '829554752613',
    appId: '1:829554752613:web:6329e24aa80444d11fda8c',
    measurementId: 'G-7HVFZW0N0E',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// connectAuthEmulator(auth, 'http://localhost:9099');
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);
export { auth, db };
