import {
    serverTimestamp,
    addDoc,
    collection,
    setDoc,
    doc,
    getDocs,
    getDoc,
    limit,
    query,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from './config';

const addDocument = async (name, data) => {
    await addDoc(collection(db, name), {
        ...data,
        createAt: serverTimestamp(),
    });
};

const setDocument = async (name, id, data) => {
    await setDoc(doc(db, name, id), {
        ...data,
        createAt: serverTimestamp(),
    });
};

const getDocumentById = async (name, id) => {
    const docRef = doc(db, name, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
};

const getDocuments = async (name, quantity) => {
    const q = quantity ? query(collection(db, name), limit(quantity)) : query(collection(db, name));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), docId: doc.id });
    });
    return documents;
};

const deleteDocument = (name, id) => {
    const docRef = doc(db, name, id);
    deleteDoc(docRef);
};

const updateField = (name, docId, values) => {
    const docRef = doc(db, name, docId);
    updateDoc(docRef, values);
};

export { addDocument, setDocument, getDocumentById, getDocuments, deleteDocument, updateField };
