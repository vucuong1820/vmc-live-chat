import { doc, setDoc,query, serverTimestamp, collection, limit, getDocs, where, orderBy } from "firebase/firestore";
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

export const getUserList = async (membersInSelectedRoom) => {
    const q = query(collection(db, "users"),orderBy("displayName"), limit(20));
    const membersIdInSelectedRoom = membersInSelectedRoom.map(mem => mem.uid)
    console.log({membersIdInSelectedRoom, membersInSelectedRoom})

    const querySnapshot = await getDocs(q);
    const documentList = []
    querySnapshot.forEach((doc) => {
        documentList.push(doc.data())
    });
    return documentList.filter(doc => !membersIdInSelectedRoom.includes(doc.uid))
}