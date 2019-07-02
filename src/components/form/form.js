import React from 'react';

export class Form extends React.Component {
    render() {
        let inputs = [];
        
        for (let key in this.props.inputs) {
            let attributes = this.props.inputs[key];
            inputs.push(
                <input key={key} {...attributes} />
            )
        }

        return (
            <form onSubmit={(e) => {e.preventDefault(); console.log('submitted')}}>
                {inputs}
            </form>
        )
    }
}