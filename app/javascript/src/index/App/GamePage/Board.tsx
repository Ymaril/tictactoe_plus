import React from "react";
import chunk_array from "array.chunk";
import {Button, Row} from "react-bootstrap";

interface Board {
    board: number[],
    onClick: (square) => void
    locked?: boolean
}

import './Board.css';

function Board(props: Board) {
    const board = chunk_array(props.board, 10);

    const squares = {
        0: {
            variant: 'outline-primary',
            text: ' ',
            locked: false
        },
        1: {
            variant: 'outline-success',
            text: 'X',
            locked: true
        },
        2: {
            variant: 'outline-danger',
            text: 'O',
            locked: true
        }
    };

    return board.map((row, row_index) =>
            <Row key={row_index}>
                {
                    row.map((square, square_index) =>
                        <Button className="square col m-1"
                                key={square_index}
                                disabled={props.locked || squares[square].locked}
                                variant={squares[square].variant}
                                onClick={_ => props.onClick(row_index * 10 + square_index)}>
                            {squares[square].text}
                        </Button>
                    )
                }
            </Row>
    );
}

export default Board;
