import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(-2);
  };

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzk0NGZmMzJjNGE0OTNhYTFkYjFkMzliZmJiZTUyYSIsInN1YiI6IjY1NDk0YWNhZmQ0ZjgwMDBlNDgwYWUxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.njEwUwlryCS0xKG-aDycl0uaAlUu0RuhBnuu6hkIDUg",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={handleClick} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
