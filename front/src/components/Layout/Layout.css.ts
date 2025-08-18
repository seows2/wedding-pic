import { vars } from "@/app/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const LayoutContainer = style({
  maxWidth: "460px",
  margin: "0 auto",
  color: vars.colors.text.primary,
  background: vars.colors.background["01"],
  padding: "44px 22px 88px 22px",
});
