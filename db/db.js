import pgPromise from "pg-promise"
const pgp = pgPromise({})

const localDB = "postgres://postgres:nimda@localhost:5432/registrations"
const connectionString = process.env.DATABASE_URL || localDB

const config = {
  connectionString,
  max: 20,
  ssl: {
    rejectUnauthorized: false
  }
}

const db = pgp(config)

export default db
