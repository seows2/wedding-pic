import { Layout } from "@/components/Layout";
import { Intro } from "@/components/Intro/Intro";
import { Divider } from "@/components/Divier";
import { FileDropzone } from "@/components/FileDropzone";
import { Spacing } from "@/components/common/Spacing";

export default function Home() {
  return (
    <Layout>
      <Intro />
      <Spacing size={14} />
      <Divider />
      <Spacing size={14} />
      <FileDropzone />
    </Layout>
  );
}
