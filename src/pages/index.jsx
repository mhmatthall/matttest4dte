/* eslint-disable @next/next/no-html-link-for-pages */
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Layout from "@/components/landing/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          cronicl &ndash; Let&apos;s explore our local outdoors together.
        </title>
      </Head>
      <main>
        <Card
          variant="outlined"
          headline="cronicl"
          subhead="Let's explore our local outdoors together."
          description="This is a prototype biodiversity education app for Down to Earth,
          made at Swansea University. It isn't open to the public yet, so only login
          if you know what you're doing."
          actions={
            <>
              <Button href="/play" label="Join a session" variant="outlined" />
              <Button href="/dashboard" label="Login" variant="filled" />
            </>
          }
        />
      </main>
    </Layout>
  );
}
