/**
 * @file Stub scrapbook page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import Head from "next/head";

export default function ScrapbookView() {
  return (
    <Layout>
      <Head>
        <title>{"Scrapbook" + pageTitleSuffix}</title>
      </Head>
      <h1>Scrapbook</h1>
    </Layout>
  );
}
