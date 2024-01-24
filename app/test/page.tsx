import Test from '@/component/test/Test'
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
 ): Promise<Metadata> {
  // Read route params
  const id = params.id
  async function getDoctors() {
    const querySnapshot = await getDocs(collection(db, "Doctors"));
    const doctors : any = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return doctors;
}
 
  // Fetch data from Firestore
  const data: {
    price: string,
    about: string,
    name: string,
    photoURL: string,
    id: string
  }[] = await getDoctors()
 
  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
     title: data[0].name,
     openGraph: {
      title: data[0].name,
       description: data[0].about,
       images: [{ url: data[0].photoURL }, ...previousImages],
     },
  }
 }
 type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
 }
function Page({ params, searchParams, ...props }: Props) {
  console.log(props, 'props')
  console.log(params, 'params')
  return (
    <Test />
  )
}


export default Page


