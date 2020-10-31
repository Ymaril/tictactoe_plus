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
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{game.x_player.email}</ListGroup.Item>
                  <ListGroup.Item>
                    {game.o_player ? game.o_player.email : '---'}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  {
                    !game.o_player &&
                    <LinkContainer to="/login">
                      <Card.Link>Играть</Card.Link>
                    </LinkContainer>
                  }
                  <LinkContainer to="/login">
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
