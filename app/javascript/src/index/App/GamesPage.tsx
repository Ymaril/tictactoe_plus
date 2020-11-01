import React, { useEffect, useState, Fragment } from "react";
import { useApi } from "../shared/api";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [createdGame, setCreatedGames] = useState();
  const api = useApi();

  useEffect(() => {
    api.get(`/api/games`).then((res) => setGames(res.data));
  }, []);

  function createGame() {
    api
      .post("/api/games", {})
      .then((result) => setCreatedGames(result.data.id));
  }

  if (createdGame) {
    return <Redirect to={`/games/${createdGame}`} />;
  }

  return (
    <Fragment>
      <Button variant="outline-primary" onClick={createGame} className="mb-5">
        Создать
      </Button>
      <Row md={4}>
        {games.map((game, index) => (
          <Card className="ml-2" key={index}>
            <Card.Body>
              <Card.Title>Игра #{game.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {
                  {
                    created: "Создана",
                    started: "В процессе",
                    finished: "Закончена",
                  }[game.state]
                }
              </Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{game.x_player.email}</ListGroup.Item>
              <ListGroup.Item>
                {game.o_player ? game.o_player.email : "---"}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <LinkContainer to={`/games/${game.id}`}>
                <Card.Link>Смотреть</Card.Link>
              </LinkContainer>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Fragment>
  );
}

export default GamesPage;
