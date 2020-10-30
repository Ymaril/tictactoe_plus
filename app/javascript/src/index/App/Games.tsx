import React, { useEffect, useState } from "react";
import { useApi } from "../shared/api";

function Games() {
  const [games, setGames] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get(`/api/games`).then((res) => setGames(res.data));
  }, []);

  return games.map((game, index) => (
    <div key={index}>
      {game.id} {game.state}
    </div>
  ));
}

export default Games;
