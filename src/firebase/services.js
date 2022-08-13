import { serverTimestamp, addDoc, collection, setDoc, doc, getDocs, getDoc, limit, query } from 'firebase/firestore';
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
    await getDoc(docRef);
};

const getDocuments = async (name, quantity) => {
    const q = quantity ? query(collection(db, name), limit(quantity)) : query(collection(db, name));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
        documents.push(doc.data());
    });
    return documents;
};

export { addDocument, setDocument, getDocumentById, getDocuments };
