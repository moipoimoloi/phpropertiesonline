/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

// Next dev mode (HMR / react-refresh) and Next image optimization both need eval + websockets.
// Production locks those down.
const scriptSrc = isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'";
const connectSrc = isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://i.ytimg.com",
      "media-src 'self'",
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
      connectSrc,
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'"
    ].join("; ")
  }
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
