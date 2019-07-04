import React from 'react';
/**
 * Rennder an item of list
 * @param {Props} props 
 * @return {ReactComponent}
 */
export default function Item(props) {
    const item = props.data;
    return <li data-index={item.index}>
        <div className={(item.checked ? "checked " : "") + "item-check item-block"}
            data-action="check"/>
        <div className="item-date item-block">{item.date}</div>
        <div className="item-delete item-block" data-action="delete"/>
        <div className="item-text item-block">{item.text}</div>
        <div className="clearfix" />
        </li>
};