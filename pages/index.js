import Link from "next/link";
import Header from "../components/header";
import Layout from "../components/notesAppLayout";

function Index() {
  return (
    <Layout>
      <Header />
      <section>
        <Link href="/about">
          <a>Go to About Me</a>
        </Link>
      </section>
    </Layout>
  );
}

export default Index;
