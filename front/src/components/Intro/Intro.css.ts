import { style } from "@vanilla-extract/css";

export const IntroPageContainer = style({
  textAlign: "center",
});

export const Banner = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "0 22px",
  marginBottom: " 30px",
  flex: 1,
});

export const HandImage = style({
  marginBottom: "16px",
});

export const MRImage = style({
  borderRadius: "10px",
  aspectRatio: "3 / 4",
  marginBottom: "16px",
});
