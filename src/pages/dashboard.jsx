/**
 * @file User dashboard page
 */
import LogoutButton from "@/components/auth/LogoutButton";
import Layout, { pageTitleSuffix } from "@/components/layout/Layout";
import Head from "next/head";
import { withSessionSsr } from "../../lib/session/withSession";

/**
 * Dashboard page component
 * @param {object} user The user object from the session cookie
 */
export default function Dashboard({ user }) {
  return (
    <Layout>
      <Head>
        <title>{"Home" + pageTitleSuffix}</title>
      </Head>
      <h1>Welcome back, {user.name}</h1>
      <p>
        Your username is <code>{user.username}</code>, your UID is{" "}
        <code>{user.userId}</code>, and you belong to the following roles:
      </p>
      <ul>
        {user.roles.map((role) => (
          <li key={role}>
            <code>{role}</code>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </Layout>
  );
}

/**
 * Server-side function to pass user data from session cookie to page props
 * @param {object} req The request object
 * @returns {Promise<GetServerSidePropsResult>} The user object from the session cookie
 */
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    return {
      props: { user },
    };
  }
);
