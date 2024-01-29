import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: any) {
  const doctorData: any = await getDoctorById(params.id);
  return (
    <>
      <p>doctor info</p>
      <p>{doctorData.result.name.en}</p>
      <p>{doctorData.result.about.en}</p>
      <Image
        src={doctorData.result.photoURL}
        width={1200}
        height={630}
        alt={doctorData.result.name.en}
       
      />
    </>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log(params, "params from doctor id page");
  // Fetch data from Firestore
  const data: any = await getDoctorById(params.id);
  console.log(JSON.stringify(data.result), "data from doctor id page");
  return {
    title: data.result.name.en,
    openGraph: {
      title: data.result.name.en,
      description: data.result.about.ar,
      images: [
        {
          url: data.result.photoURL,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

async function getDoctorById(id: string): Promise<any> {
  const docRef = doc(db, "doctors", id);
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
