import ClientDepugger from "@/component/ClientDepugger";
import GoToDoctorBtn from "@/component/GoToDoctorBtn";
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

  const options = {
    consultant: "استشاري",
    practitioner: "ممارس",
    specialist: "أخصائي",
  };

  return (
    <div className="w-full  h-screen flex flex-col justify-center items-center gap-2">
      <Image
        src={doctorData.result.photoURL}
        width={300}
        height={300}
        style={{ borderRadius: "10%", objectFit: "cover" }}
        alt={doctorData.result.name.en}
        priority
      />

      <p className="text-3xl font-bold">{doctorData.result.name.ar}</p>
      <p className="text-3xl">
        {options[doctorData.result.medTitle as keyof typeof options]}
      </p>
      <p className="text-xl text-center">{doctorData.result.about.ar}</p>

      <GoToDoctorBtn />
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch data from Firestore
  const data: any = await getDoctorById(params.id);
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
    result = docSnap.data();
  } else {
    console.log("No such document!");
    error = "No such document!" + collection + id;
  }
  return { result, error };
}
