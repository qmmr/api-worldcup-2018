import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import schema from './schema'

const app = express()
const PORT = 3000
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/world-cup-2018')

app.use('/graphql', graphqlHTTP({ graphiql: true, schema }))

app.get('/', (req, res) => res.json({ error: 'Please use /graphql endpoint...' }))

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
