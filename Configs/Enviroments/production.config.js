const productionConfig = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 5000,
  },
  db: {
    uri: process.env.DEV_MONGODB_URI,
    name: process.env.DEV_DB_NAME,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    useNewUrl: process.env.DEV_USE_NEW_URL_PARSER,
    useUnifiedTopology: process.env.DEV_USE_UNIFIED_TOPOLOGY,
    useFindAndModify: process.env.DEV_USE_FIND_AND_MODIFY,
  },
  email: {
    address: process.env.DEV_EMAIL,
    password: process.env.DEV_EMAIL_PASS,
  },
  jwt: {
    authSecret: process.env.DEV_MONGODB_URI,
    dataSecret: process.env.DEV_DB_NAME,
    emailSecret: process.env.DEV_DB_USER,
    forgotSecret: process.env.DEV_DB_PASS,
    expiresIn: process.env.DEV_USE_NEW_URL_PARSER,
    expiresInOnetime: process.env.DEV_USE_UNIFIED_TOPOLOGY,
    useFindAndModify: process.env.DEV_USE_FIND_AND_MODIFY,
  },
  bcrypt: {
    saltRounds: process.env.DEV_SALT_ROUNDS,
  },
};

module.exports = productionConfig;
