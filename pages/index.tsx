import FileUpload from "@/components/UI/FileUpload";
import UploadGallery from "@/components/UI/UploadGallery";
import { useAuth } from "@/contexts/AuthContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import LoginPage from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main className={`${inter.className}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Herogram App</title>
      </Head>
      {isAuthenticated ? (
        <>
          <FileUpload />
          <UploadGallery />
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </main>
  );
}
