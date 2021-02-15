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
        teamName,
        venue,
      }
    ) => {
      let query = Game.find()
      let team

      if (teamName) {
        team = await Team.findOne({ name: teamName })
        query = query.or([{ homeTeam: team._id }, { awayTeam: team._id }])
      }

      if (datetime) query = query.where('datetime').regex(datetime)
      if (finished) query = query.where('finished', finished)
      if (matchID) query = query.where('matchID', matchID)
      if (matchURL) query = query.where('matchURL').regex(matchURL)
      if (overtime) query = query.where('overtime', overtime)
      if (overtimeScore) query = query.where('overtimeScore', overtimeScore)
      if (penalties) query = query.where('penalties', penalties)
      if (penaltiesScore) query = query.where('penaltiesScore', penaltiesScore)
      if (score) query = query.where('score', score)
      if (stadium) query = query.where('stadium', stadium)
      if (stage) query = query.where('stage', stage)
      if (status) query = query.where('status', status)
      if (venue) query = query.where('venue', venue)

      return query
        .populate({ path: 'homeTeam', populate: { path: 'games' } })
        .populate({ path: 'awayTeam', populate: { path: 'games' } })
        .exec()
    },
    group: async (_, { _id, name }) => {
      // TODO: Refactor to use populate teams
      // TODO: Add association to games
      if (_id) {
        return await Group.findById(_id)
      } else if (typeof name === 'string' && name !== '') {
        return await Group.findOne({ name })
      }
    },
    groups: async () => await Group.find(),
    team: async (_, { _id, name, teamID, teamURL }) => {
      let query = Team.findOne()

      if (_id) {
        return await Team.findById(_id)
      }

      if (name) query = query.where('name', name)
      if (teamID) query = query.where('teamID', teamID)
      if (teamURL) query = query.where('teamURL').regex(teamURL)

      return query.populate({ path: 'games' }).exec()
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
