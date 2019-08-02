// @flow
import * as React from 'react'
import { colors, constants } from '../site/src/utils/style'
import { useQuestionContext } from '../site/src/utils/question-state'

type QuestionProps = {
  question: React.Node,
  name: string,
  answers: { [key: string]: string }
}

export let Question = (props: QuestionProps) => {
  let [value, setValue] = useQuestionContext(props.name)
  return (
    <div
      css={{
        borderRadius: 8,
        padding: 8,
        border: `${colors.border} solid 4px`,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
        marginTop: 8
      }}
    >
      <span
        css={{
          fontSize: constants.fontSizes[3],
          flex: 1,
          textAlign: 'center',
          paddingBottom: 8
        }}
      >
        {props.question}
      </span>
      <div css={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {Object.keys(props.answers).map(key => {
          return (
            <label
              key={key}
              css={{
                borderRadius: 4,
                padding: 8,
                margin: 4,
                '&:hover': {
                  color: colors.border
                },
                '&:active': {
                  color: colors.pink
                },
                color: value === key ? colors.pink : null,
                border: `${colors.border} solid 1px`,
                textAlign: 'center'
              }}
            >
              <span css={{ paddingRight: 4 }}>{props.answers[key]}</span>
              <input
                checked={value === key}
                onChange={() => {
                  setValue(key)
                }}
                name={props.name}
                type="radio"
                value={key}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}

export let PkgQuestion = () => {
  return (
    <Question
      name="pkg"
      question="Are you using Emotion for React or Vanilla Emotion?"
      answers={{
        react: 'Emotion for React',
        vanilla: 'Vanilla Emotion'
      }}
    />
  )
}

export let CRAQuestion = () => {
  return (
    <Question
      name="cra"
      question="Are you using Create React App?"
      answers={{
        yes: 'Yes',
        no: 'No'
      }}
    />
  )
}

export let StyleSyntaxQuestion = () => {
  return (
    <Question
      name="syntax"
      question="Are you using string styles or object styles?"
      answers={{
        string: 'String Styles',
        object: 'Object Styles'
      }}
    />
  )
}

export let ConditionalFromQuestion = ({
  question,
  answer,
  children,
  default: defaultBehaviour = 'show'
}: {
  question: string,
  answer: string,
  children: React.Node,
  default: 'hide' | 'show'
}) => {
  let [value] = useQuestionContext(question)
  if (value == null && defaultBehaviour === 'show') {
    return children
  }
  return value === answer ? children : null
}
