import React, { Fragment } from "react";
import chunk_array from "array.chunk";
import { Button, Row } from "react-bootstrap";
import styled from "styled-components";

interface Board {
  board: number[];
  onClick: (square) => void;
  locked?: boolean;
}

const Square = styled(Button)`
  &:after {
    content: "";
    display: block;
    padding-top: 100%;
  }`;

function Board(props: Board) {
  const board = chunk_array(props.board, 10);

  const squares = {
    0: {
      variant: "outline-primary",
      text: " ",
      locked: false,
    },
    1: {
      variant: "outline-success",
      text: "X",
      locked: true,
    },
    2: {
      variant: "outline-danger",
      text: "O",
      locked: true,
    },
  };

  return board.map((row, row_index) => (
    <Row key={row_index}>
      {row.map((square, square_index) => (
        <Square
          className="square col m-1"
          key={square_index}
          disabled={props.locked || squares[square].locked}
          variant={squares[square].variant}
          onClick={(_) => props.onClick(row_index * 10 + square_index)}
        >
          {squares[square].text}
        </Square>
      ))}
    </Row>
  ));
}

export default Board;
