import Layout from "@/components/dashboard/Layout";
import MapLayout from "@/components/dashboard/MapLayout";

Page.getLayout = (page) => {
  return (
    <Layout>
      <MapLayout>{page}</MapLayout>
    </Layout>
  );
};

export default function Page() {
  return (
    <h1>Site selected</h1>
  );
}