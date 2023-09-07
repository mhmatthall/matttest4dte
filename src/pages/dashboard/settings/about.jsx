import Layout, { pageTitleSuffix } from "@/components/dashboard/Layout";
import SettingsLayout from "@/components/dashboard/SettingsLayout";
import Head from "next/head";

Page.getLayout = (page) => {
  return (
    <Layout>
      <SettingsLayout>{page}</SettingsLayout>
    </Layout>
  );
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{"About" + pageTitleSuffix}</title>
      </Head>
      <h1>About</h1>
      <p>
        cronicl is made by a team of PhD students at Swansea University.
        We&apos;re supported by the{" "}
        <a href="https://www.ukri.org/councils/epsrc/" target="_blank">
          Engineering &amp; Physical Sciences Research Council (grant number
          EP/S021892/1)
        </a>
        .
      </p>
      <p>
        It&apos;s a collaborative project with{" "}
        <a href="https://downtoearthproject.org.uk/" target="_blank">
          Down to Earth
        </a>{" "}
        &ndash; whose inspiration, support, and feedback made cronicl possible.
        Special thanks to Kate Denner, Chris Dow, and the rest of the team.
      </p>
      <h2>Attribution</h2>
      <p>
        cronicl is powered by many amazing open source projects and libraries,
        we thank the contributors to the following key projects:
      </p>
      <ul>
        <li>Material Design system and iconography by Google</li>
        <li>Inter typeface by the Inter Project Authors</li>
        <li>
          Map data, style, and hosting by OpenStreetMap, OpenMapTiles, and
          Stadia Maps respectively
        </li>
        <ul>
          <li>
            <a href="https://www.openstreetmap.org/about/" target="_blank">
              &copy; OpenStreetMap contributors
            </a>
          </li>
          <li>
            <a href="https://www.openmaptiles.org/" target="_blank">
              &copy; OpenMapTiles
            </a>
          </li>
          <li>
            <a href="https://stadiamaps.com/" target="_blank">
              &copy; Stadia Maps
            </a>
          </li>
        </ul>
        <li>Next.js by Vercel and contributors</li>
        <li>React.js by Meta and contributors</li>
        <li>Hosting and infrastructure by Amazon Web Services</li>
      </ul>
    </>
  );
}
