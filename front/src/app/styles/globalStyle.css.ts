import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  fontFamily: "Cafe24Oneprettynight, sans-serif",
  fontSize: "16px",
  fontWeight: "normal",
  fontStyle: "normal",
});
