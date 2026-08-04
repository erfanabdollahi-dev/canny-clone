import "dotenv/config";

const getEnv = (var_name: string): string => {
  const value = process.env[var_name];

  if (!value) {
    throw new Error(`${var_name} does not exist!`);
  }
  return value;
};

const env = {
  JWT_SECRET: getEnv("JWT_SECRET"),
  MONGO_URI: getEnv("MONGO_URI"),
  PORT: getEnv("PORT"),
  SERVER_URL: getEnv("SERVER_URL"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  FRONTEND_URL: getEnv("FRONTEND_URL"),
  FRONTEND_PASSWORD_RESET_URL: getEnv("FRONTEND_PASSWORD_RESET_URL"),
};

export default env;
