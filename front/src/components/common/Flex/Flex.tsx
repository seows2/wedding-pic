import * as S from "./Flex.css";

type Align =
  | "baseline"
  | "center"
  | "start"
  | "end"
  | "flex-end"
  | "flex-start";
type Justify =
  | "space-evenly"
  | "space-around"
  | "space-between"
  | "start"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start";

type FlexProps = {
  justify: Justify;
  align: Align;
  gap: number;
  vertical: boolean;
};

export const Flex = (props: FlexProps) => {
  const { justify, align, vertical } = props;

  return <div className={S.Flex({ align, justify, vertical })}></div>;
};
