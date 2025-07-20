import * as S from "./Layout.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return <div className={S.LayoutContainer}>{children}</div>;
};

export default Layout;
