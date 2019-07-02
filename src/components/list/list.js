import React from 'react';

export class List extends React.Component {
    makeItem(i) {
        let item = this.props.data[i];
        return <li key={i}>
            <div className={(item.checked ? "checked " : "") + "item-check"}/>
            <div className="item-date">{item.date}</div>
            <div className="item-delete"/>
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
                    <div className="header-date">Date</div>
                    <div className="header-text">Text</div>
                    </header>
                    <ul>
                        {items}
                        </ul>
                </div>
        )
    }
}