/**
 * @file Stub map page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import Head from "next/head";

export default function MapView() {
  return (
    <Layout>
      <Head>
        <title>{"Map" + pageTitleSuffix}</title>
      </Head>
      <h1>Map</h1>
    </Layout>
  );
}
