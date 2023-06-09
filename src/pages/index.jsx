/* eslint-disable @next/next/no-html-link-for-pages */
import Layout from "@/components/landing/Layout";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>DtE Test App</title>
      </Head>
      <main>
        <h1>Down to Earth x EPIC CDT</h1>
        <p>
          This is a next.js site hosted on Github and served by AWS Amplify!
        </p>
        <p>
          <a href="/dashboard">Go to Dashboard</a>
        </p>
        <Image
          src="/img/jones.png"
          alt="Matt Jones' noggin"
          width={500}
          height={500}
          priority
        />
      </main>
    </Layout>
  );
}
