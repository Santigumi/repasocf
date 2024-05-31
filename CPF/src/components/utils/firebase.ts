import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Info } from "../types/song";
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDblKMSaGR3l3VUP8Gcylpskcio8hM7cdQ",
    authDomain: "vanguard-35d26.firebaseapp.com",
    projectId: "vanguard-35d26",
    storageBucket: "vanguard-35d26.appspot.com",
    messagingSenderId: "187651490470",
    appId: "1:187651490470:web:f995465153247e0d556a67",
    measurementId: "G-Q75K0PGBWK"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addInfo = async (formData: Omit<Info, 'id'>) =>{
try {
    const docRef = await addDoc(collection(db, 'info'), formData)
} catch (error) {
    console.error('Error adding documents: ')
}
}

export const getInfo = async () => {
    const querySnapshot = await getDocs(collection(db, 'info'));
    const arrayInfo: Array<Info>= [];

    querySnapshot.forEach((doc) => {
    const data = doc.data() as any;
    arrayInfo.push({id: doc.id, ...data})
    });
    return arrayInfo
}