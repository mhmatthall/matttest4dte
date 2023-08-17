import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import MapLayout from "@/components/dashboard/MapLayout";
import Head from "next/head";

Page.getLayout = (page) => {
  return (
    <Layout>
      <MapLayout>{page}</MapLayout>
    </Layout>
  );
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{"Map" + pageTitleSuffix}</title>
      </Head>
      <Card
        variant="filled"
        description="Tap a site on the map to view more info."
        actionsDivider
        actionsAlignment="stretch"
        actions={
          <Button
            href="/map/create-site"
            label="Create a new site"
            variant="outlined"
          />
        }
      />
    </>
  );
}
