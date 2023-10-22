/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly SECRET_KEY: string;
  readonly REDIS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: string;
  }
}
