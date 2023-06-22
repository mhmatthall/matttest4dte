import LoginForm from "@/components/auth/LoginForm";
import Layout, { pageTitleSuffix } from "@/components/landing/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{"Login" + pageTitleSuffix}</title>
      </Head>
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </Layout>
  );
}
