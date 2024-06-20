import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersAPI = process.env.REACT_APP_PLAYER_NAME;
        const playerPicsAPI = process.env.REACT_APP_PLAYER_PIC;

        if (!playersAPI || !playerPicsAPI) {
          throw new Error("API URLs are not defined");
        }

        const [playersResponse, playerPicsResponse] = await Promise.all([
          axios.get(playersAPI),
          axios.get(playerPicsAPI),
        ]);

        console.log('Players Response:', playersResponse);
        console.log('Player Pics Response:', playerPicsResponse);

        debugger;
        const playersWithPics = playersResponse.data.map(player => {
          const pic = playerPicsResponse.data.find(pic => pic.id === player.id);
          return { ...player, pic: pic ? pic.url : '' };
        });

        setPlayers(playersWithPics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    debugger;
    fetchData();
    
    // return () => {
    //   axiosInstance.defaults.abortController.abort();
    // };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Players Details</h1>
      <div className="row">
        {players.map(player => (
          <div key={player.id} className="col-md-4 mb-4">
            <div className="card own_style">
              <img src={player.pic} className="card-img-top img_hover" alt={player.name} loading='lazy' />
              <div className="card-body">
                <h5 className="card-title">{player.name}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
