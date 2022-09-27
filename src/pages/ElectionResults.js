import { Results } from "../components"
import React  from 'react'
import  {getResults} from "../api/results/results-api"

const ElectionResults = () => {
    const data = getResults();
    console.log(data)
  return (
    <div>
      <h1>hello</h1>
      <Results />
    </div>
  )
}

export default ElectionResults