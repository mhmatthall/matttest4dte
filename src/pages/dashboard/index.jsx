/**
 * @file User dashboard page
 */
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import { withSessionSsr } from "@/lib/auth/withSession";
import Head from "next/head";
import { createContext } from "react";

export const UserContext = createContext({ name: "Error" });

/**
 * Server-side function to pass user data from session cookie to page props
 * @param {object} req The request object
 * @returns {Promise<GetServerSidePropsResult>} The user object from the session cookie
 */
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

/**
 * Dashboard page component
 * @param {object} user The user object from the session cookie
 */
export default function Dashboard({ user }) {
  return (
    <UserContext.Provider value={user}>
      <Layout>
        <Head>
          <title>{"Home" + pageTitleSuffix}</title>
        </Head>
        <h1>What would you like to do?</h1>
      </Layout>
    </UserContext.Provider>
  );
}
