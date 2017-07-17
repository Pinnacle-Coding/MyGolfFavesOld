const user = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_PROFILE':
      var newState = Object.assign({}, state)
      newState[action.field] = action.value
      return newState
    case 'POPULATE_PROFILE':
      return Object.assign({}, state, action.fields)
    default:
      return state
  }
}

export default user
