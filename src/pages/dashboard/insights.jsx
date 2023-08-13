/**
 * @file Stub insights page
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
        <title>{"Insights" + pageTitleSuffix}</title>
      </Head>
      <h1>Insights</h1>
    </>
  );
}
