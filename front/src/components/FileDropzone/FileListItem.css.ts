import { vars } from "@/app/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const FileListItemWrap = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: vars.space.sm,
});
