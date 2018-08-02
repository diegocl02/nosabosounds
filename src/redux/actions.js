// functions that will return {type and payload}
export function incrementWins(){
  return({type: "INCREMENT_WINS"})
}
export function incrementLoses(){
  return({type: "INCREMENT_LOSES"})
}
export function changeDifficulty(diff){
  return({type: "CHANGE_DIFFICULTY", payload: {
    difficulty: diff
  }})
}
