import React from 'react';
import './styles/index.css';

export function Square(props) {
    return (
        <button className={`square ${props.className}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
