import React, {Fragment, useEffect, useState } from "react";
import { useApi } from "../shared/api";

function Game({ match }) {
    const [game, setGame] = useState(undefined);
    const [error, setError] = useState(false);
    const api = useApi();

    useEffect(() => {
        api
            .get(`/api/games/${match.params.id}`)
            .then((res) => setGame(res.data))
            .catch(e => setError(true));
    }, []);

    if(error) { return (<div>Произошла ошибка</div>); }

    return (
        <Fragment>
            {game && <div>{game.id} {game.state}</div>}
        </Fragment>
    );
}

export default Game;
