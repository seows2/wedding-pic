import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const dropzone = recipe({
  base: {
    width: "100%",
    minHeight: "240px",
    borderRadius: "16px",
    border: "2px dashed #D1D1D1",
    backgroundColor: "#F9F9F9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  variants: {
    isDragActive: {
      true: {
        borderColor: "#FFB800",
        backgroundColor: "#FFFBEB",
        transform: "scale(1.02)",
      },
      false: {
        borderColor: "#D1D1D1",
      },
    },
    hasFiles: {
      true: {
        minHeight: "120px", // 파일이 있으면 높이를 줄여 리스트를 보여줌
      },
    },
  },
  defaultVariants: {
    isDragActive: false,
  },
});

export const previewGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 120px))",
  gap: "12px",
  width: "100%",
});
