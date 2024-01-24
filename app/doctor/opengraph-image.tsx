import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  //   const interSemiBold = fetch(
  //     new URL('./Inter-SemiBold.ttf', import.meta.url)
  //   ).then((res) => res.arrayBuffer())

  async function getDoctors() {
    const querySnapshot = await getDocs(collection(db, "Doctors"));
    const doctors: any = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return doctors;
  }

  // Fetch data from Firestore
  const data: {
    price: string;
    about: string;
    name: string;
    photoURL: string;
    id: string;
  }[] = await getDoctors();

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={data[0].photoURL}
          alt={data[0].name}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
