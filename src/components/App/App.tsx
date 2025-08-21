import { useState } from 'react'
import css from './App.module.css'
import CafeInfo from '../CafeInfo/CafeInfo'
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStats/VoteStats'
import Notification from '../Notification/Notification'
import type { VoteType, Votes } from "../../types/votes";

const App = () => {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const onVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1
    })
  }

  const onReset = () => {
    setVotes({ good: 0,
    neutral: 0,
    bad: 0})
  }

  const totalVotes = votes.bad + votes.good + votes.neutral;

  const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={ onVote} onReset={onReset} canReset={totalVotes > 0} />
      {totalVotes > 0 ? (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />) : <Notification/>}
        
  </div>
  )
}

export default App