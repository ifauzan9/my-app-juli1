import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "./config";

export async function getAllData(colletionName: string) {
  const querySnapshot = await getDocs(collection(db, colletionName));
  let result: any[] = [];
  querySnapshot.docs.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() });
  });
  return result;
  // return querySnapshot.docs.map((doc) => doc.data());
}

export async function updateData(collectionName: string, data: any) {
  try {
    const docRef = doc(db, collectionName, data.id);
    await updateDoc(docRef, data);
    console.log("Data updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}
