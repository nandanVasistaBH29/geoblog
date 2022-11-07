module.exports = {
  async rewrites() {
    return [
      {
        source: "https://newsapi.org/v2/:path*",
        destination:
          "https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://newsapi.org/v2/:path*",
      },
    ];
  },
};
