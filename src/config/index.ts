import * as dotenv from 'dotenv';
import * as joi from '@hapi/joi';

// dotenv.parse(fs.readFileSync(filePath))
process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

  const envVarsSchema = joi
    .object({
      PORT: joi.number().default('3000'),
      NODE_ENV: joi
        .string()
        .allow(['development', 'production', 'qa', 'staging'])
        .required(),
      APP_DB:joi.string().required(),
      db_host:joi.string().required(),
      db_port:joi.number().required(),
      db_username:joi.string().required(),
      db_password:joi.string().required(),
      db_database:joi.string().required(),
    }).unknown()
  .required();

  const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
  if (error) {   throw new Error(`Config validation error: ${error.message}`); }
  
export const config = {
  env: envVars.NODE_ENV,
  url: envVars.APP_URL,
  port: envVars.PORT,
  db: envVars.APP_DB,
  db_host: envVars.db_host,
  db_port: envVars.db_port,
  db_username: envVars.db_username,
  db_password: envVars.db_password,
  db_database: envVars.db_database,
}
