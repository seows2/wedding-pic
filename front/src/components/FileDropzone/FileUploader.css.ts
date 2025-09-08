import { vars } from "@/app/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const FileUploaderContainer = recipe({
  base: {
    width: "80%",
    margin: "0 auto",
    padding: "10px",
    height: "200px",
    border: `1px dashed ${vars.colors.border["01"]}`,
    borderRadius: "5px",
  },
  variants: {
    isDragAccept: {
      true: {
        backgroundColor: vars.colors.background["01"],
      },
      false: {
        backgroundColor: vars.colors.background["01"],
      },
    },
    isDragReject: {
      true: {
        backgroundColor: vars.colors.background["01"],
      },
      false: {
        backgroundColor: vars.colors.background["01"],
      },
    },
  },
});

export const FileUploaderInput = style({
  border: 0,
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "0 -1px -1px 0",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
});
