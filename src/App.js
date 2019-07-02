import React from 'react';
import {Form} from './components/form/form.js';
import {List} from './components/list/list.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTextValue: 1,
      filterDateFromValue: '2010-04-29',
      filterDateToValue: '2019-04-29'
      }


    this.handleDateFromFilterChange = this.handleDateFromFilterChange.bind(this);
    this.handleDateToFilterChange = this.handleDateToFilterChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
  }

  handleDateFromFilterChange() {
    console.log('handleDateFromFilterChange');
  }

  handleDateToFilterChange() {
    console.log('handleDateToFilterChange');
  }

  handleTextFilterChange(e) {
    let value = e.target.value;
    this.setState({
      filterTextValue: value
    })
    // this.setState({
    //   inputsFilter: {
    //     inputText: value
    //   }
    // });
    //console.log(this.state)//????? State не обновлятеся до конца handleTextFilterChange?
  }

  render() {
    console.log(this.state.filterTextValue);
    return (
      <div className="App">
        <Form className="form-add" inputs={{
            inputText: {
              defaultValue: '',
              placeholder: 'add',
              type: 'text'
            },
            inputDate: {
              defaultValue: new Date().toLocaleDateString(),
              type: 'date'
            },
            inputSubmit: {
              value: 'Submit',
              type: 'submit'
            }
          }} />
        <List className="list" />
        <Form className="form-filter" inputs={{
            inputText: {
              value: this.state.filterTextValue,
              placeholder: 'filter',
              type: 'text',
              onChange: this.handleTextFilterChange
            },
            inputDateFrom: {
              defaultValue: '2010-01-30',
              type: 'date',
              onChange: this.handleDateFromFilterChange
            },
            inputDateTo: {
              value: '2010-01-30',
              type: 'date',
              onChange: this.handleDateToFilterChange
            }}}
         />
      </div>
    );
  }
}

export default App;
