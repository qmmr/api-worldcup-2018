import Team from './models/team'

export const resolvers = {
  Query: {
    // games: () => (root, args, ctx, info) => ctx.db.query.games({}, info),
    // game: (root, args, ctx, info) => ctx.db.query.games({}, info).filter(game => game.id === args.id)[0],
    teams: async () => await Team.find(),
    team: async (_, { _id, name }) => {
      if (_id) {
        return await Team.findById(_id)
      } else if (typeof name === 'string' && name !== '') {
        return await Team.findOne({ name })
      }
    },
  },
  Mutation: {
    createGame: async (_, args) => await Game.create(args.input),
    // updateGame: async (_, args) => await Game.findOneAndUpdate({ args._id }, args.input, { new: true }),
    // async deleteGame(_, { _id }) {
    //   return await Game.findByIdAndRemove(_id)
    // },
    // game: (root, args) => {
    //   const game = {
    //     id: `game-${gameId++}`,
    //     teamA: args.teamA,
    //     teamB: args.teamB,
    //     score: args.score,
    //   }
    //   games.push(game)

    //   return game
    // },
    // updateGame: (root, args) => {
    //   const gameIndex = games.indexOf(args.id)
    //   const game = { ...games[gameIndex], ...args }
    //   games = [...games.slice(0, gameIndex), game, ...games.slice(gameIndex++)]

    //   return game
    // },
    // deleteGame: (root, args) => {
    //   return find(games, game => game.id === args.id)
    // },
  },
}
