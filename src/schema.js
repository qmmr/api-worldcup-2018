import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
  type Team {
    _id: ID!
    emoji: String!
    emojiString: String!
    shortName: String!
    games: [String]!
    flag: String!
    iso2: String!
    name: String!
  }

  type Game {
    _id: ID!
    awayTeam: Team!,
    datetime: String!,
    finished: Boolean!,
    homeTeam: Team!,
    matchURI: String!,
    score: String!,
    stadium: String,
    status: String!,
    venue: String,
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
    game(_id: ID, score: String, shortName: String): Game
    games: [Game!]!
  }

  input TeamInput {
    shortName: String
    name: String!
  }

  input GameInput {
    awayTeam: TeamInput!,
    datetime: String!,
    finished: Boolean!,
    homeTeam: TeamInput!,
    matchURI: String,
    score: String!,
    stadium: String,
    status: String!,
    venue: String,
  }

  type Mutation {
    createGame(game: GameInput!): Game
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
