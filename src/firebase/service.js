import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "./config"

export const addDocumentWithId = (collectionName, id, data) => {
    setDoc(doc(db, collectionName, id), {
        ...data,
        createdAt: serverTimestamp()
    });
}

export const addDocumentWithAutoId = (collectionName, data) => {
    const dataRef = doc(collection(db,collectionName))
    setDoc(dataRef,{
        ...data,
        createdAt: serverTimestamp()
    })
}