/**
 * @file Stub map page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import Head from "next/head";

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{"Map" + pageTitleSuffix}</title>
      </Head>
      <h1>Map</h1>
    </>
  );
}
