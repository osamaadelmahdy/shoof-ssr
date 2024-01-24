'use client';
import React, { useEffect } from "react";

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

async function getDoctorById(id: string) {
  const docRef = doc(db, "doctors", id);
  const docSnap = await getDoc(docRef);
  let result = null;
  let error = null;

  if (docSnap.exists()) {
    result = docSnap.data();
  } else {
    console.log("No such document!");
    error = "No such document!" + collection + id;
  }
  return { result, error };
}

 async function getDoctors() {
    const querySnapshot = await getDocs(collection(db, "doctors"));
    const doctors = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return doctors;
}

 function Doctor({ params, searchParams }: any) {
  useEffect(() => {
    const fn = async () => {
      const data: any = await getDoctorById('nxSKd2CXtvaWmngWRnz2Ia1iEGw2')
      console.log(data.result)
    }
    fn()
  })

  return <div>doctor data client</div>;


}

export default Doctor;
