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
    orderBy,
} from 'firebase/firestore';
import { db } from './config';

// add document to firestore , auto generate id
const addDocument = async (name, data) => {
    const result = await addDoc(collection(db, name), {
        ...data,
        createAt: serverTimestamp(),
    });

    return result;
};

// add document to firestore with define generate id

const setDocument = async (name, id, data) => {
    await setDoc(doc(db, name, id), {
        ...data,
        createAt: serverTimestamp(),
    });
};

// get data by the id of document
const getDocumentById = async (name, id) => {
    const docRef = doc(db, name, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
};

// get all data from collection
const getDocuments = async (name, quantity) => {
    const q = quantity
        ? query(collection(db, name), limit(quantity), orderBy('createAt'))
        : query(collection(db, name));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), docId: doc.id });
    });
    return documents;
};

// delete document
const deleteDocument = (name, id) => {
    const docRef = doc(db, name, id);
    deleteDoc(docRef);
};

//update field in the document
const updateField = (name, docId, values) => {
    const docRef = doc(db, name, docId);
    updateDoc(docRef, values);
};

export { addDocument, setDocument, getDocumentById, getDocuments, deleteDocument, updateField };
