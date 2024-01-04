export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      API_KEY_AMADEUS: string;
      API_SECRET_AMADEUS: string;

      JWT_EXPIRES_IN: string;
      JWT_SECRET: string;

      POSTGRES_URL: string;
      POSTGRES_PRISMA_URL: string;
      POSTGRES_URL_NON_POOLING: string;
      POSTGRES_USER: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
    }
  }
}
