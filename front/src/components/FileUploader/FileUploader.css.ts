import { vars } from "@/app/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const FileUploaderContainer = recipe({
  base: {
    width: "80%",
    margin: "0 auto",
    padding: "10px",
    height: "300px",
    border: `1px solid ${vars.colors.border["01"]}`,
    borderRadius: "5px",
  },
  variants: {
    isOnDrop: {
      true: {
        backgroundColor: vars.colors.text.primary,
      },
      false: {
        backgroundColor: vars.colors.border["01"],
      },
    },
  },
});
