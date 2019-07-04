import React from 'react';
import './form.css';

/**
 * rendering a form
 * @param {props} props
 * @return {ReactComponent}
 */
export default function Form(props) {
    const inputs = props.inputs;

    const res = [];
    for (const key in inputs) {
        const attributes = inputs[key];
        res.push(
            <input key={key} {...attributes} />
        )
    }

    return (
        <form onSubmit={(e) => {e.preventDefault(); props.onSubmit(e)}}>
            {res}
        </form>
    )
}