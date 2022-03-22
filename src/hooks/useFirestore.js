import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

function useFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([])

  React.useEffect(() => {

    if (!condition.compareValue || condition.compareValue.length === 0) return;

    const collectionFiltered = query(
      collection(db, collectionName),
      orderBy("createdAt"),
      where(condition.fieldName, condition.operator, condition.compareValue),
    );


    const unsubscribe = onSnapshot(collectionFiltered, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents)
    });

    //clean up
    return unsubscribe
    
  }, [collectionName, condition]);
  return documents;
}

export default useFirestore;
