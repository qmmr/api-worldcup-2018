import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
  type Team {
    _id: ID!
    emoji: String!
    emojiString: String!
    flag: String!
    games: [Game]!
    iso2: String!
    name: String!
    players: [Player!]!
    shortName: String!
  }

  type Player {
    countrycode: String
    jerseyNum: String
    photo: String
    playerId: Int!
    playerName: String!
    playerRole: String
    playerURL: String!
  }

  type Coach {
    personalURL: String!
    name: String!
    photo: String!
  }

  type Lineup {
    coach: Coach!
    flag: String
    lineup: [Player!]!
    name: String
    shortName: String
    substitutes: [Player!]!
    teamId: String
  }

  type Game {
    _id: ID!
    awayTeam: Team!
    awayTeamLineup: Lineup!
    datetime: String!
    finished: Boolean!
    homeTeam: Team!
    homeTeamLineup: Lineup!
    matchID: Int!
    matchURL: String!
    overtime: Boolean
    overtimeScore: String
    penalties: Boolean
    penaltiesScore: String
    score: String!
    stadium: String
    stage: String!
    status: String!
    venue: String
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
    game(_id: ID, matchID: Int, matchURL: String): Game
		games(
			datetime: String,
			finished: Boolean,
			matchID: Int,
			matchURL: String,
			overtime: Boolean,
			overtimeScore: String,
			penalties: Boolean,
			penaltiesScore: String,
			score: String,
			stadium: String,
			stage: String,
			status: String,
			venue: String,
		): [Game!]!
  }

  input TeamInput {
    shortName: String
    name: String!
  }

  input GameInput {
    awayTeam: TeamInput!
    datetime: String!
    finished: Boolean!
    homeTeam: TeamInput!
    matchURL: String
    score: String!
    stadium: String
    status: String!
    venue: String
  }

  type Mutation {
    createGame(game: GameInput!): Game
  }
`

export default makeExecutableSchema({ typeDefs, resolvers })
