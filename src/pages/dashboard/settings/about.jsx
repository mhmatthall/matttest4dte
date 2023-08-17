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
        cronicl is made by a team of PhD students at Swansea University as part
        of the{" "}
        <a
          href="https://www.swansea.ac.uk/computational-foundry/epsrc-centre-for-doctoral-training/"
          target="_blank"
        >
          EPIC CDT
        </a>
        . We&apos;re supported by the{" "}
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
        </a>
        , whose inspiration, support, and feedback made cronicl possible.
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
        <li>Maps and map data by Mapbox</li>
        <ul>
          <li>
            <a href="https://www.mapbox.com/about/maps/" target="_blank">
              &copy; Mapbox
            </a>
          </li>
          <li>
            <a href="http://www.openstreetmap.org/about/" target="_blank">
              &copy; OpenStreetMap
            </a>
          </li>
          <li>
            <a
              href="https://www.mapbox.com/map-feedback/#/-74.5/40/10"
              target="_blank"
            >
              Contribute to Mapbox
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
