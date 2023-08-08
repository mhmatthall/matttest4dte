/**
 * @file Stub insights page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import Head from "next/head";

export default function InsightsView() {
  return (
    <Layout>
      <Head>
        <title>{"Insights" + pageTitleSuffix}</title>
      </Head>
      <h1>Insights</h1>
    </Layout>
  );
}
