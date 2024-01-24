import Doctor from "@/component/doctor/Doctor";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
function Page({ params, searchParams, ...props }: Props) {
  console.log(props, "props");
  console.log(params, "params");
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

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {


//   // Fetch data from Firestore
//   const data: {
//     price: string;
//     about: string;
//     name: string;
//     photoURL: string;
//     id: string;
//   }[] = await getDoctors();

//   return {
//     title: data[0].name,
//     openGraph: {
//       title: data[0].name,
//       description: data[0].about,
//       images: [{
//         url: data[0].photoURL,
//         width: 1200,
//         height: 630,
//       }],
//     },
//   };
// }
