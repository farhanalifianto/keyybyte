import Image from "next/image";
import Layout from "./root-layout";
import Head from "next/head";
import { AiFillCaretUp } from "react-icons/ai";
export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout>
        <div className="center">
          <h1 className="h1">KeyyByte - Keyy's Private Cloud Services</h1>
        </div>
      </Layout>
    </>
  );
}
