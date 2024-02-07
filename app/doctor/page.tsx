import Doctor from "@/component/doctor/Doctor";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
function Page({ params, searchParams, ...props }: Props) {
  return <Doctor doctorId={params.id} />;
}

export default Page;

async function getDoctors() {
  const querySnapshot = await getDocs(collection(db, "doctors"));
  const doctors: any = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return doctors;
}