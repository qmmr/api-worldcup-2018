import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
  type Team {
    _id: ID!
    emoji: String!
    emojiString: String!
    shortName: String!
    flag: String!
    iso2: String!
    name: String!
  }

  type Game {
    _id: ID!
    score: String!
    teamA: String!
    teamB: String!
  }

  type Stadium {
    _id: ID!
    city: String!
    createdAt: String
    image: String!
    latitude: Float!
    longitude: Float!
    name: String!
  }

  type Group {
    _id: ID!
    name: String!
    teams: [Team]!
    games: [Game!]!
  }

  type Query {
    group(_id: ID, name: String): Group
    groups: [Group!]!
    team(_id: ID, name: String): Team
    teams: [Team!]!
  }

  input GameInput{
    score: String!
    teamA: String!
    teamB: String!
  }

  type Mutation {
    createGame(input: GameInput) : Game
    updateGame(_id: ID!, input: GameInput) : Game
    deleteGame(_id: ID!) : Game
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
