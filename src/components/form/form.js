import React from 'react';

export class Form extends React.Component {
    render() {        
        let inputs = this.props.inputs;

        let res = [];
        for (let key in inputs) {
            let attributes = inputs[key];
            res.push(
                <input key={key} {...attributes} />
            )
        }

        return (
            <form onSubmit={(e) => {e.preventDefault(); console.log('submitted'); this.props.onSubmit(e)}}>
                {res}
            </form>
        )
    }
}