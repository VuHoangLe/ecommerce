import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/config';

function useFireStore(collections, condition) {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const q = query(
            collection(db, collections),
            where(condition.fieldName, condition.operator, condition.compareValue)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocuments(
                querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
        return () => {
            unsubscribe();
        };
    }, [collections, condition]);
    return documents;
}

export default useFireStore;
