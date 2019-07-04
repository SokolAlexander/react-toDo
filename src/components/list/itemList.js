import React from 'react';
import Item from './item.js';
/**
 * Render a list of items
 * @param {Props} props 
 * @return {Array} of reactComponents
 */
export default function ItemList(props) {
    const items = [];
    let i = 0;
    while (props.data[i]) {
        items.push(
            <Item key={props.data[i].index} data={props.data[i]} />);
        i++;
    }
    return items
};