import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: '<apiKey>',
	authDomain: '<domain>',
	projectId: '<project id>',
	storageBucket: '<storage bucket>',
	messagingSenderId: '<sender id>',
	appId: '<app id>',
	measurementId: '<measurned id>',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const USER_COLECTION = collection(db, 'user');
