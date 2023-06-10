import LogoutButton from "@/components/auth/LogoutButton";
import Layout from "@/components/layout/Layout";
import { withSessionSsr } from "../../lib/withSession";
import { withSessionSsr } from "../../lib/session/withSession";

// Actual page component
const Home = ({ user }) => (
  <Layout>
    <h1>Welcome back, {user.name}</h1>
    <LogoutButton />
  </Layout>
);

// Server-side function to pass user data from session cookie to page props
export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;
  return {
    props: { user },
  };
});

export default Home;
