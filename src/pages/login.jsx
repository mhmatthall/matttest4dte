import LoginForm from "@/components/auth/LoginForm";
import Layout from "@/components/layout/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </Layout>
  );
}
