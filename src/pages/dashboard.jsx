import LogoutButton from "@/components/auth/LogoutButton";
import Layout, { pageTitleSuffix } from "@/components/layout/Layout";
import Head from "next/head";
import { withSessionSsr } from "../../lib/session/withSession";

// Actual page component
export default function Dashboard({ user }) {
  return (
    <Layout>
      <Head>
        <title>{"Home" + pageTitleSuffix}</title>
      </Head>
      <h1>Welcome back, {user.name}</h1>
      <LogoutButton />
    </Layout>
  );
}

// Server-side function to pass user data from session cookie to page props
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    return {
      props: { user },
    };
  }
);
