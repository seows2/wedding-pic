import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  allowedDevOrigins: ["192.168.112.213"],
};

export default withVanillaExtract(nextConfig);
