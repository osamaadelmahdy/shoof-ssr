import React from "react";

import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
async function addData(
  colllection: string,
  id: string,
  data: { name: string }
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

async function getData(collection: string, id: string) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  let result = null;
  let error = null;

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    result = docSnap.data();
  } else {
    console.log("No such document!");
    error = "No such document!" + collection + id;
  }
  return { result, error };
}

 async function getDoctors() {
    const querySnapshot = await getDocs(collection(db, "Doctors"));
    const doctors = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return doctors;
}

async function Test() {
  const data = await getDoctors()

//   if (error) return <p>error</p>;

  console.log(data);

  return <div>{data[0].name}</div>;
}

export default Test;
