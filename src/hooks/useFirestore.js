import {
  collection, onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

function useFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {

    if (!condition.compareValue || condition.compareValue.length === 0) return;
    
    let collectionFiltered;
    if(condition.operator === "not-in"){
       collectionFiltered = query(
        collection(db, collectionName),
        where(condition.fieldName, condition.operator, condition.compareValue),
      );
    }else{
      collectionFiltered = query(
        collection(db, collectionName),
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt"),
      );  
    }
     
    const unsubscribe = onSnapshot(collectionFiltered, (snapshot) => {
     
      let newDocuments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setDocuments(newDocuments)
      setIsLoading(false)
    });

    //clean up
    return unsubscribe
    
  }, [collectionName, condition]);
  return [documents, isLoading];
}

export default useFirestore;
