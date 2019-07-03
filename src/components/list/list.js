import React from 'react';
import './list.css';

export class List extends React.Component {
    makeItem(i) {
        let item = this.props.data[i];
        return <li key={item.index} data-index={item.index}>
            <div className={(item.checked ? "checked " : "") + "item-check"}
                data-action="check"/>
            <div className="item-date">{item.date}</div>
            <div className="item-delete" data-action="delete"/>
            {this.props.data[i].text}</li>
    }

    render() {
        let items = [];
        let i = 0;
        while (this.props.data[i]) {
            items.push(this.makeItem(i));
            i++;
        }
        return (
            <div onClick={this.props.onClick}>
                <header>
                    <div className="header-date" data-action="sortByDate">Date</div>
                    <div className="header-text" data-action="sortByText">Text</div>
                    </header>
                    <ul>
                        {items}
                        </ul>
                </div>
        )
    }
}