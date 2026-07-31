import "dotenv/config";

const getEnv = (var_name: string): string => {
  const value = process.env[var_name];

  if (!value) {
    throw new Error(`${var_name} does not exist!`);
  }
  return value;
};

const env = {
  MONGO_URI: getEnv("MONGO_URI"),
};

export default env;
