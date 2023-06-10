import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>DtE Test App</title>
      </Head>
      <main>
        <h1>Down to Earth x EPIC CDT</h1>
        <p>
          This is a next.js site hosted on Github and served by AWS Amplify!
        </p>
        <p>
          <Link href="/dashboard">Go to Dashboard</Link>
        </p>
        <Image
          src="/img/jones.png"
          alt="Matt Jones' noggin"
          width={500}
          height={500}
          priority
        />
      </main>
    </Layout>
  );
}
