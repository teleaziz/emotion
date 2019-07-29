// @flow
import React, { useReducer, useContext, useEffect, type Node } from 'react'

export let Question = () => {}

let QuestionContext = React.createContext<{
  dispatch: ({ name: string, value: string }) => void,
  state: { [string]: string }
}>({
  dispatch: () => {},
  state: {}
})

export function useQuestionContext(name: string) {
  let { dispatch, state } = useContext(QuestionContext)
  return [
    state[name],
    (newValue: string) => {
      dispatch({ name, value: newValue })
    }
  ]
}

function getLocalStorageValue() {
  if (typeof window === 'undefined') {
    return {}
  }
  let val = localStorage.getItem('questions')
  if (val == null) {
    return {}
  }
  try {
    return JSON.parse(val)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error parsing json:', err)
    return {}
  }
}

export let QuestionProvider = ({ children }: { children: Node }) => {
  let [state, dispatch] = useReducer<
    { [string]: string },
    { name: string, value: string }
  >((state, action) => {
    return { ...state, [action.name]: action.value }
  }, getLocalStorageValue())
  useEffect(
    () => {
      localStorage.setItem('questions', JSON.stringify(state))
    },
    [state]
  )
  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionContext.Provider>
  )
}
