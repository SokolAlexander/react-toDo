import React from 'react';
import Header from './header.js';
import ItemList from './itemList.js';
import './list.css';

/**
 * a react component rendering
 * @param {props} props
 * @return {ReactComponent}
 */
export default function List(props) {
        return (
            <div onClick={props.onClick} className="list">
                <Header />
                    <ItemList data={props.data} />
                </div>
        )
}


