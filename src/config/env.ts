import "dotenv/config";

const getEnv = (var_name: string): string => {
  const value = process.env[var_name];

  if (!value) {
    throw new Error(`${var_name} does not exist!`);
  }
  return value;
};

const env = {
  JWT_SECRET : getEnv("JWT_SECRET"),
  MONGO_URI: getEnv("MONGO_URI"),
  PORT: getEnv("PORT"),
};

export default env;
