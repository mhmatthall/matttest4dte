/**
 * @file User dashboard page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import { useUser } from "@/lib/auth/useUser";
import Head from "next/head";

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default function Page() {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>{"Home" + pageTitleSuffix}</title>
      </Head>
      <h1>Home</h1>
      Hello, {user?.name ?? "stranger"}!
    </>
  );
}
