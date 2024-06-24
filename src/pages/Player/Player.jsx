import React, { useEffect, useState } from 'react';
import "./Player.cs";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id}= useParams();
  const navigate=useNavigate();


  const[apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:"",

  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjE4NzkyZDQ4YjQxN2U1MjBlM2IzNDEzNmE0NDI3NCIsIm5iZiI6MTcxOTIyMDgyNy42Mjg5MTYsInN1YiI6IjY2NzgxMTk0YzAwODNiYjkwYWYyNTA0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4UOaM5w5C-dyWyToLyLQBwHgyrrJDdVziLbivVZWh0o'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));

  },[])
  

  return (
    <div className='player'>
      <header>
        <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(`/`)}}/>
      </header>
      <iframe 
        width='90%' 
        height='90%' 
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='trailer'
        frameBorder='0'
        allowFullScreen>
      </iframe>
      <article className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </article>
    </div>
  );
}

export default Player;
