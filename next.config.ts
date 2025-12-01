import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  serverExternalPackages: ['mongoose', 'bcrypt', 'chromadb'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  outputFileTracingExcludes: {
    '*': [
      '.next/cache/**/*',
      'node_modules/onnxruntime-node/**/*',
      'node_modules/onnxruntime-web/**/*',
      'node_modules/@huggingface/**/*',
      'node_modules/chromadb-js-bindings-linux-x64-gnu/**/*',
      'node_modules/chromadb-js-bindings-*/**/*',
      'node_modules/@img/**/*',
      'node_modules/sharp/**/*',
      'node_modules/@react-pdf/**/*',
      'node_modules/pdfkit/**/*',
      'node_modules/fontkit/**/*',
    ],
  },
};

export default nextConfig;
