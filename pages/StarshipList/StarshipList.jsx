import { useState, useEffect } from "react";
import { getAllStarships } from "../../src/services/sw-api";
import { Link } from "react-router-dom";

const Starships = () => {
  const [starshipsList, setStarshipsList] = useState([]);



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
      
      {starshipsList.map((starship, idx) => {
        const shipId = starship.url.slice(21)
        return(
          <Link to={`${shipId}`} key={idx}>
        <button key = {idx} className="starship-card">{starship.name}</button>
          </Link>
        
      )}
      )}
    </main>
</>
  );
}


export default Starships;