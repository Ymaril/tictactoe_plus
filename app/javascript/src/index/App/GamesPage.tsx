import React, { useEffect, useState } from "react";
import { useApi } from "../shared/api";
import {Card, ListGroup, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

function GamesPage() {
  const [games, setGames] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get(`/api/games`).then((res) => setGames(res.data));
  }, []);

  return (
      <Row md={4}>
        {
          games.map((game, index) => (
              <Card className='ml-2' key={index}>
                <Card.Body>
                  <Card.Title>Игра #{game.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {
                      {created: 'Создана', started: 'В процессе', finished: 'Закончена'}[game.state]
                    }
                  </Card.Subtitle>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{game.x_player.email}</ListGroup.Item>
                  <ListGroup.Item>
                    {game.o_player ? game.o_player.email : '---'}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  {
                    game.state === 'created' &&
                    <LinkContainer to={`/games/${game.id}#play`}>
                      <Card.Link>Играть</Card.Link>
                    </LinkContainer>
                  }
                  <LinkContainer to={`/games/${game.id}`}>
                    <Card.Link>Смотреть</Card.Link>
                  </LinkContainer>
                </Card.Body>
              </Card>
          ))
        }
      </Row>
  );
}

export default GamesPage;
