export default {
  PORT: 3000,
  SECRET: '1234567890',
  // MONGO_DB_URI: 'mongodb://localhost:27017/bloods'
  local: {
    MONGO_DB_URI: 'mongodb://localhost:27017/bloods'
  },
  dev: {
    MONGO_DB_URI: 'mongodb://localhost:27017/blood'
  }
}
