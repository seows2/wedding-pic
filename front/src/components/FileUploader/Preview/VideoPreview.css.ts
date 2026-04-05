import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1", // 이미지 그리드와 통일
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#000",
});

export const thumbnail = style({
  objectFit: "cover",
  transition: "transform 0.3s ease",
  selectors: {
    [`${container}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const videoIcon = style({
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  color: "white",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "10px",
  fontWeight: "bold",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  zIndex: 1,
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
