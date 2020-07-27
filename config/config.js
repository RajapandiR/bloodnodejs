export default {
  PORT: 300,
  SECRET: 'ATSSecretKey',
   local: {
    MONGO_DB_URI: 'mongodb://localhost:27017/blood'
  },
  dev: {
    MONGO_DB_URI: 'mongodb://localhost:27017/blood'
  },
}
