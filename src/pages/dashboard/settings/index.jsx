import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import SettingsLayout from "@/components/dashboard/SettingsLayout";
import Head from "next/head";

Page.getLayout = (page) => {
  return (
    <Layout>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{"Settings" + pageTitleSuffix}</title>
      </Head>
      <p>Detail pane placeholder message</p>
    </>
  );
}
