import React from 'react';
import './form.css';

/**
 * class representing a form
 */
export class Form extends React.Component {
    /**
     * render form
     */
    render() {        
        const inputs = this.props.inputs;

        let res = [];
        for (let key in inputs) {
            const attributes = inputs[key];
            res.push(
                <input key={key} {...attributes} />
            )
        }

        return (
            <form onSubmit={(e) => {e.preventDefault(); this.props.onSubmit(e)}}>
                {res}
            </form>
        )
    }
}