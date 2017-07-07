import { combineReducers } from 'redux'
import user from './user.js'
import courses from './courses.js'
import wallet from './wallet.js'
import offers from './offers.js'

const reducer = combineReducers({
  user,
  courses,
  offers,
  wallet
})

export default reducer
