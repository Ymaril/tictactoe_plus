import React, { Fragment, useEffect, useState } from "react";
import { useApi } from "../shared/api";
import { useAuth } from "../shared/auth";
import { useCable } from "../shared/cable";
import Board from "src/index/App/GamePage/Board";
import { Button } from "react-bootstrap";

function GamePage({ match }) {
  const [game, setGame] = useState(undefined);
  const [error, setError] = useState(false);
  const [gameChannel, setGameChannel] = useState();
  const cable = useCable();
  const api = useApi();
  const { currentUser } = useAuth();

  useEffect(() => {
    setGameChannel(
      cable.subscriptions.create(
        {
          channel: "GameChannel",
          game: match.params.id,
        },
        {
          received: ({ game }) => setGame(game),
        }
      )
    );

    api
      .get(`/api/games/${match.params.id}`)
      .then((res) => setGame(res.data))
      .catch((e) => setError(true));

    return () => {
      gameChannel?.unsubscribe();
    };
  }, []);

  if (error) {
    return <div>Произошла ошибка</div>;
  }

  const join = () => {
    api
      .put(`/api/games/${match.params.id}/join`)
      .then((res) => setGame(res.data))
      .catch((e) => setError(true));
  };

  const getMovePlayer = () => (game.x_move ? game.x_player : game.o_player);

  const sendMove = (square: number) => {
    gameChannel?.send({ move: square });
  };

  return (
    <Fragment>
      {game && (
        <Fragment>
          <h1>Ходит {getMovePlayer()?.email || "Никто"}</h1>
          {!game.o_player && game.x_player.id !== currentUser.id && (
            <Button variant="primary" onClick={() => join()}>
              Вступить
            </Button>
          )}
          {game.board && (
            <Board
              locked={currentUser.id !== getMovePlayer()?.id}
              board={game.board}
              onClick={(square) => sendMove(square)}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default GamePage;
