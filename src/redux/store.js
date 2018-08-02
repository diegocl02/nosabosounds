// import reducer
import {reducer} from './reducer'
import {createStore} from 'redux'
// use createStore from redux to create store

let initialState = {
  wins: 0,
  loses: 0,
  difficulty: 'easy'
}

export const store = createStore(reducer, initialState)
// It will receive the reducer and a initial state ... const intialState = { wins: 0, lose: 0}
// then export that store
