import UploadGallery from "@/components/UI/UploadGallery";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Herogram App</title>
      </Head>
      <UploadGallery />
    </main>
  );
}
