import { Layout } from "@/components/Layout";
import { Intro } from "@/components/Intro/Intro";
import { Divider } from "@/components/Divier";
import { FileDropzone } from "@/components/FileDropzone";

export default function Home() {
  return (
    <Layout>
      <Intro />
      <Divider />
      <FileDropzone />
    </Layout>
  );
}
