import Link from "next/link";
import Layout from "../components/notesAppLayout";

function Index() {
  return (
    <Layout>
      <section>
        <Link href="/about">
          <a>Go to About Me</a>
        </Link>
      </section>
    </Layout>
  );
}

export default Index;
