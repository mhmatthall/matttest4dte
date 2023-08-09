/* eslint-disable @next/next/no-html-link-for-pages */
import Layout from "@/components/landing/Layout";
import Placeholder from "@/components/landing/Placeholder";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>cronicl – Let&apos;s explore our local outdoors together.</title>
      </Head>
      <main>
        <Placeholder />
      </main>
    </Layout>
  );
}
