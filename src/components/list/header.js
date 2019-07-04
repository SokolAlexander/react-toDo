import React from 'react';
/**
 * render a header for a list
 * @return {ReactComponent}
 */
export default function Header() {
    return (
        <header className="list-header">
        <div className="header-check header-block" />
        <div className="header-date header-block" data-action="sortByDate">Date</div>
        <div className="header-text header-block" data-action="sortByText">Text</div>
        <div className="header-delete header-block" />
        <div className="clearfix" />
        </header>
    )
};
