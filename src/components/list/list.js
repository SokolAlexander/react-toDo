import React from 'react';
import './list.css';

/**
 * class represents a List of items
 */
export class List extends React.Component {
    /**
     * create one item
     * @param {number} i
     * @returns {ReactComponent} 
     */
    makeItem(i) {
        const item = this.props.data[i];
        return <li key={item.index} data-index={item.index}>
            <div className={(item.checked ? "checked " : "") + "item-check item-block"}
                data-action="check"/>
            <div className="item-date item-block">{item.date}</div>
            <div className="item-delete item-block" data-action="delete"/>
            <div className="item-text item-block">{this.props.data[i].text}</div>
            <div className="clearfix" />
            </li>
    }

    /**
     * renders a list
     * @returns {ReactComponent}
     */
    render() {
        let items = [];
        let i = 0;
        while (this.props.data[i]) {
            items.push(this.makeItem(i));
            i++;
        }
        return (
            <div onClick={this.props.onClick} className="list">
                <header className="list-header">
                    <div className="header-check header-block" />
                    <div className="header-date header-block" data-action="sortByDate">Date</div>
                    <div className="header-text header-block" data-action="sortByText">Text</div>
                    <div className="header-delete header-block" />
                    <div className="clearfix" />
                    </header>
                    <ul>
                        {items}
                        </ul>
                </div>
        )
    }
}