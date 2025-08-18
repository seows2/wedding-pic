import { Layout } from "@/components/Layout";
import { Intro } from "@/components/Intro/Intro";
import { Divider } from "@/components/Divier";
import { FileUploader } from "@/components/FileUploader";

export default function Home() {
  return (
    <Layout>
      <Intro />
      <Divider />
      <FileUploader />
    </Layout>
  );
}
