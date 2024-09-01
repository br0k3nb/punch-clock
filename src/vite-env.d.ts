/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_VERCEL_ENV: string;
    readonly VITE_VERCEL_DEV_API_URL: string;
    readonly VITE_VERCEL_API_URL: string;
}