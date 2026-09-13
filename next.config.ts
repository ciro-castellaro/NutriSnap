import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite probar la app desde el celular por la IP de red local en desarrollo.
  // Se define en .env.local (no se commitea) para no hardcodear la IP en el repo.
  allowedDevOrigins: process.env.DEV_LAN_IP ? [process.env.DEV_LAN_IP] : undefined,
};

export default nextConfig;
