import { useState, useEffect } from "react";
import { getAllStarships } from "../../src/services/sw-api";
import { Link } from "react-router-dom";

const Starships = () => {
  const [starshipsList, setStarshipsList] = useState([]);

  function extractId(url) {
    const regex = /\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  useEffect(() => {
    const fetchStarshipList = async () => {
      const starshipData = await getAllStarships();
      setStarshipsList(starshipData.results);
    };
    fetchStarshipList();
  }, []);


  if (!starshipsList) return <h1>BB-8 is looking for ships...</h1>;

  return (
    <>
      <h1>Star Wars Starships</h1>
      <main className="starship-container">
        {starshipsList.map((starship) => {
          const shipId = extractId(starship.url);
          return (
            <div key={starship.name} className="starship-card">
              <Link to={`/starships/${shipId}`}>{starship.name}</Link>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Starships;
