import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import SettingsLayout from "@/components/dashboard/SettingsLayout";
import { useUser } from "@/lib/auth/useUser";
import Head from "next/head";

Page.getLayout = (page) => {
  return (
    <Layout>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};

export default function Page() {
  const { isLoading, user } = useUser();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{"Account settings" + pageTitleSuffix}</title>
      </Head>
      <h1>{user.name}</h1>
      <ul>
        <li>username: {user.username}</li>
        <li>roles: {user.roles}</li>
      </ul>
    </>
  );
}
