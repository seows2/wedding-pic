import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#000",
});

export const thumbnail = style({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  selectors: {
    [`${container}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const loadingPlaceholder = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f0f0",
  color: "#ccc",
});
