export const SERVER_CONFIG = {
  PORT: +(process.env.PORT ?? 3333),
  HOST: '0.0.0.0'
};
export const SERVER_URL = `${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`;