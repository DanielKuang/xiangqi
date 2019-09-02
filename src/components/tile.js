import React from 'react';

export default function Tile(props) {
    return (
        <button className = {"tile"  + props.shade}
        onClick = {props.onClick}
        style = {props.style}>
        </button>
    );
}