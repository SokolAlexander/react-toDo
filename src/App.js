import React from 'react';
import {Form} from './components/form/form.js';
import {List} from './components/list/list.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: {
        value: 1
      }
    }

    this.inputsAdd = {
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
    };
    this.inputsFilter = {
      inputText: {
        value: this.state.filterText.vlaue,
        placeholder: 'add',
        type: 'text',
        onChange: (e) => this.handleTextFilterChange(e)
      },
      inputDateFrom: {
        value: '',
        type: 'date',
        onChange: this.handleDateFromFilterChange
      },
      inputDateTo: {
        value: '',
        type: 'date',
        onChange: this.handleDateToFilterChange
      }
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
      filterText: {
        value: value
      }
    })
    // this.setState({
    //   inputsFilter: {
    //     inputText: value
    //   }
    // });
    //console.log(this.state)//????? State не обновлятеся до конца handleTextFilterChange?
  }

  render() {
    console.log('app rendered');
    console.log(this.state)
    return (
      <div className="App">
        <Form className="form-add" inputs={this.inputsAdd} />
        <List className="list" />
        <Form className="form-filter" inputs={this.inputsFilter} 
          text={this.state.filterTextValue}
          dateFrom={this.state.filterDateFromValue}
          dateTo={this.state.filterDateToValue}/>
      </div>
    );
  }
}

export default App;
