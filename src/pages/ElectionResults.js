import { Results } from "../components"
import React, { useState, useEffect } from 'react'
import {getLocalStorage} from '../util/local-storage.util'
 
import { useNavigate,useParams } from 'react-router-dom';
import { BsChevronLeft,BsSearch,BsChevronRight } from "react-icons/bs";
import axios from "axios";

const ElectionResults = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const organizationId = JSON.parse(getLocalStorage('VOTER')).organizationId;
  const token = JSON.parse(getLocalStorage('VOTER')).token;
  console.log(organizationId, electionId);
 const mockData= {
  "results": [
    {
      "candidates": [
        {
          "name": "ogidi",
          "vote_count": 9
        },
        {
          "name": "bel",
          "vote_count": 7
        },
        {
          "name": "augustine",
          "vote_count": 23
        }
      ],
      "office_name": "president",
      "total_vote_count": 39,
      "winner": {
        "candidate_name": "augustine",
        "total_votes": 39
      }
      },
    {
      "candidates": [
        {
          "name": "ogidi",
          "vote_count": 9
        },
        {
          "name": "bel",
          "vote_count": 7
        },
        {
          "name": "augustine",
          "vote_count": 23
        }
      ],
      "office_name": "secretary",
      "total_vote_count": 39,
      "winner": {
        "candidate_name": "augustine",
        "total_votes": 39
      }
      },
    {
      "candidates": [
        {
          "name": "ogidi",
          "vote_count": 9
        },
        {
          "name": "bel",
          "vote_count": 7
        },
        {
          "name": "augustine",
          "vote_count": 23
        }
      ],
      "office_name": "secretary",
      "total_vote_count": 39,
      "winner": {
        "candidate_name": "augustine",
        "total_votes": 39
      }
    },{
      "candidates": [
        {
          "name": "ogidi",
          "vote_count": 9
        },
        {
          "name": "bel",
          "vote_count": 7
        },
        {
          "name": "augustine",
          "vote_count": 23
        }
      ],
      "office_name": "secretary",
      "total_vote_count": 39,
      "winner": {
        "candidate_name": "augustine",
        "total_votes": 39
      }
    }
  ]
  } 
   const [resultsData, setResultsData] = useState(mockData)
      
   useEffect(() => {  

const base_url = `${process.env.REACT_APP_BASE_ENDPOINT.toString()}`;

 const getResults = async () => {
  const url = `${base_url}/api/v1/data/?election_id=${electionId}&organization_id=${organizationId}`;
  try {
    const response = await axios.get(url,{
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetResults: ", response.data);
    if (response.data.results) {
      setResultsData(response.data)
    }
  } catch (err) {
    console.log(err);
  }
     };
    getResults()
   
   },[electionId,organizationId,token])
  
  const [current, setCurrent] = useState(0);
  const length = resultsData.length;
  
  const nextOffice = () => {
    setCurrent(current=== length - 1 ? 0 : current + 1);
  };

  const prevOffice = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };  
 
  var officesArray={};
  var candidateScores={};
  resultsData.results.map((Office, index) => {
    officesArray[index] = Office.candidates.map(offices => offices.name);
    candidateScores[index]=Office.candidates.map(offices => offices.vote_count);
    return 0;
  })
  
   
  const ResultsArray=resultsData.results.map((Office, index) => {
    return (
      <div key={index} className={index === current ? 'slide--active' : 'slide'}>
        {index===current && (< Results labels={officesArray[current]} data={candidateScores[current]} name={Office.office_name} />)}
      </div>
    );
        })  
  
  return (
    <div  >
    
      <div className='container'>
        <nav className='results__header'>
          <ul className='results__header--list'>
            <li className='results__header--nav'>
              <BsChevronLeft color="black" size="1em" onClick={()=>navigate(-1)} />
              <h3>Results</h3>
            </li>
            <li className='results__header--input'>
              <input type='text' placeholder='Search position' />
              <BsSearch color="black" size="1em" />
            </li>
          </ul>
        </nav>      
      </div>
      <div className='results__box'>
        <BsChevronLeft color="black" size="1em" className='left-arrow' onClick={prevOffice} />
        <BsChevronRight color="black" size="1em" className='right-arrow' onClick={nextOffice} />

         {ResultsArray}
      </div>
    </div>
  )
}

export default ElectionResults