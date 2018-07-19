import dotenv from 'dotenv'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import schema from './schema'

mongoose.Promise = global.Promise
dotenv.config()

const DB_USER = process.env.DB_USER || 'admin'
const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
const DB_HOST = process.env.DB_HOST || '127.0.0.1'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'fifa-worldcup-2018'
const URL = process.env.URL || 'https://www.fifa.com/worldcup/matches/#groupphase'

export const connect = async () => {
  try {
    const db = await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    console.log(
      `Connection as user "${DB_USER}" to mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}\n has been established! 🎉\n`
    )

    return {
      db,
      disconnect: () => {
        console.info('\nClosing connection to the DB\nBye! 👋\n')
        db.close()
      },
    }
  } catch (error) {
    throw error
  }
}

const app = express()
const PORT = 3000

const { db, disconnect } = connect()

app.use('/graphql', graphqlHTTP({ graphiql: true, schema }))

app.get('/', (req, res) => res.redirect('/graphql'))

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
