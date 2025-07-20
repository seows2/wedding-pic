import { Divider } from "./components/common/Divier";
import { FileUploader } from "./components/FileUploader";
import { Layout } from "./components/Layout";
import IntroPage from "./pages/Intro";

const App = () => {
  return (
    <Layout>
      <IntroPage />
      <Divider />
      <FileUploader />
    </Layout>
  );
};

export default App;
