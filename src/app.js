import dotenv from 'dotenv'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import schema from './schema'

dotenv.config()

// TODO: Check env variables and print error when not provided
const DB_USER = process.env.DB_USER || 'admin'
const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
const DB_HOST = process.env.DB_HOST || '127.0.0.1'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'fifa-worldcup-2018'

const app = express()
const PORT = 3000
mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

app.use('/graphql', graphqlHTTP({ graphiql: true, schema }))

app.get('/', (req, res) => res.json({ error: 'Please use /graphql endpoint...' }))

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
