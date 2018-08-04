
/// Function reducer that will use state and action
export function reducer(state, action){

  let newState = {...state}

  switch (action.type) {
    case "INCREMENT_WINS":
      newState.wins += 1;
      return newState
    case "INCREMENT_LOSES":
      newState.loses += 1;
      return newState
    case "CHANGE_DIFFICULTY":
      newState.difficulty = action.payload.difficulty
      return newState
    default:
      return (state)
  }
}
/// reducer(state, action)
// and will return a new state
