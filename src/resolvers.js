import mongoose from 'mongoose'
import Team from './models/team'
import Group from './models/group'
import Game from './models/game'

export const resolvers = {
  Query: {
    game: async (_, { _id, matchID, matchURL }) => {
      if (_id) {
        return await Game.findById(_id)
          .populate({
            path: 'homeTeam',
            populate: { path: 'games' },
          })
          .populate({
            path: 'awayTeam',
            populate: { path: 'games' },
          })
          .exec()
      } else if (typeof matchID === 'number') {
        return await Game.findOne({ matchID })
          .populate({
            path: 'homeTeam',
            populate: { path: 'games' },
          })
          .populate({
            path: 'awayTeam',
            populate: { path: 'games' },
          })
          .exec()
      } else if (typeof matchURL === 'string' && matchURL !== '') {
        return await Game.findOne({ matchURL: { $regex: new RegExp(matchURL) } })
          .populate({
            path: 'homeTeam',
            populate: { path: 'games' },
          })
          .populate({
            path: 'awayTeam',
            populate: { path: 'games' },
          })
          .exec()
      }
    },
    games: async (
      _,
      {
        datetime,
        finished,
        matchID,
        matchURL,
        overtime,
        overtimeScore,
        penalties,
        penaltiesScore,
        score,
        stadium,
        stage,
        status,
        venue,
      }
    ) => {
      const query = {}
      if (datetime) query.datetime = datetime
      if (finished) query.finished = finished
      if (matchID) query.matchID = matchID
      if (matchURL) query.matchURL = matchURL
      if (overtime) query.overtime = overtime
      if (overtimeScore) query.overtimeScore = overtimeScore
      if (penalties) query.penalties = penalties
      if (penaltiesScore) query.penaltiesScore = penaltiesScore
      if (score) query.score = score
      if (stadium) query.stadium = stadium
      if (stage) query.stage = stage
      if (status) query.status = status
      if (venue) query.venue = venue
      // awayTeam: { type: Schema.Types.ObjectId, ref: 'team' },
      // awayTeamLineup: LineupSchema,
      // homeTeam: { type: Schema.Types.ObjectId, ref: 'team' },
      // homeTeamLineup: LineupSchema,
      // FIXME: Fix query for datetime to be month, day or day and time specific
      return await Game.find(query)
        .populate({
          path: 'homeTeam',
          populate: { path: 'games' },
        })
        .populate({
          path: 'awayTeam',
          populate: { path: 'games' },
        })
        .exec()
    },
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
