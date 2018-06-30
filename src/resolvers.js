import mongoose from 'mongoose'
import Team from './models/team'
import Group from './models/group'
import Game from './models/game'

export const resolvers = {
  Query: {
    // games: () => (root, args, ctx, info) => ctx.db.query.games({}, info),
    // game: (root, args, ctx, info) => ctx.db.query.games({}, info).filter(game => game.id === args.id)[0],
    game: async (_, { _id, score, shortName }) => {
      if (_id) {
        return await Game.findById(_id)
          .populate('homeTeam')
          .populate('awayTeam')
          .exec()
      } else if (typeof score === 'string' && score !== '') {
        return await Game.findOne({ score })
          .populate('homeTeam')
          .populate('awayTeam')
          .exec()
      } else if (typeof shortName === 'string' && shortName !== '') {
        return await Game.findOne({ shortName })
          .populate('homeTeam')
          .populate('awayTeam')
          .exec()
      }
    },
    games: async () => await Game.find(),
    group: async (_, { _id, name }) => {
      if (_id) {
        return await Group.findById(_id)
      } else if (typeof name === 'string' && name !== '') {
        return await Group.findOne({ name })
      }
    },
    groups: async () => await Group.find(),
    team: async (_, { _id, name }) => {
      if (_id) {
        return await Team.findById(_id)
      } else if (typeof name === 'string' && name !== '') {
        return await Team.findOne({ name })
      }
    },
    teams: async () => await Team.find(),
  },
  Mutation: {
    createGame: async (_, { game } = {}) => {
      const gameID = new mongoose.Types.ObjectId()
      let homeTeam
      let awayTeam

      // console.log('createGame game', game)

      if (typeof game.homeTeam.name === 'string') {
        homeTeam = await Team.findOneAndUpdate({ name: game.homeTeam.name }, { games: [gameID] })
          .populate('Game')
          .exec()
      }
      if (typeof game.awayTeam.name === 'string') {
        awayTeam = await Team.findOneAndUpdate({ name: game.awayTeam.name }, { games: [gameID] })
          .populate('Game')
          .exec()
      }
      console.log('homeTeam', homeTeam.name, homeTeam.games)
      console.log('awayTeam', awayTeam.name, awayTeam.games)

      const newGame = new Game({
        _id: gameID,
        awayTeam: awayTeam._id,
        datetime: game.datetime,
        finished: game.finished,
        homeTeam: homeTeam._id,
        score: game.score,
        status: game.status,
      })
      console.log('newGame', newGame)
      const saved = await newGame.save()
      console.log('saved', saved)

      return saved
    },
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
