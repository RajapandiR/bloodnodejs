export default {
  PORT: 300,
  SECRET: '1234567890',
   local: {
    MONGO_DB_URI: 'mongodb://localhost:27017/blood'
  },
  dev: {
    MONGO_DB_URI: 'mongodb://localhost:27017/blood'
  },
}
