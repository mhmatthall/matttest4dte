/**
 * @file Stub settings page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import Head from "next/head";

export default function SettingsView() {
  return (
    <Layout>
      <Head>
        <title>{"Settings" + pageTitleSuffix}</title>
      </Head>
      <h1>Settings</h1>
    </Layout>
  );
}
