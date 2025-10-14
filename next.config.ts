import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: "localhost" }, { hostname: "backend.owldishes.huseli.us" }],
    },
};

export default nextConfig;
