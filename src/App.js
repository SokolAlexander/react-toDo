import React from 'react';
import {Form} from './components/form/form.js';
import {List} from './components/list/list.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        date: '2019-04-30',
        text: 'blablabla',
        checked: true
      },
      {
        date: '2019-04-30',
        text: 'blablabla'
      }],
      filterTextValue: 1,
      filterDateFromValue: '2010-04-29',
      filterDateToValue: '2019-04-29'
      }

    this.handleDateFromFilterChange = this.handleDateFromFilterChange.bind(this);
    this.handleDateToFilterChange = this.handleDateToFilterChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);

    this.fullData = this.state.data;
  }

  handleListClick(e) {
    console.log(e.target);
  }

  handleDateFromFilterChange(e) {
    this.setState({
      filterDateFromValue: e.target.value
    });
  }

  handleDateToFilterChange(e) {
    this.setState({
      filterDateToValue: e.target.value
    });
  }

  handleTextFilterChange(e) {
    let value = e.target.value;
    let data;
    
    if (!e.nativeEvent.data) {
      data = this.fullData;
    } else {
      data = this.state.data.slice()
    }
      data = data.filter((item) => {
      return item.text.indexOf(value) !== -1
    })
    this.setState({
      filterTextValue: value,
      data: data
    })
    // this.setState({
    //   inputsFilter: {
    //     inputText: value
    //   }
    // });
    //console.log(this.state)//????? State не обновлятеся до конца handleTextFilterChange?
  }

  handleFormAddSubmit(e) {
    let text = e.target.querySelector('input[type=text]').value;
    let date = e.target.querySelector('input[type=date]').value;

    this.fullData = this.state.data.slice();
    this.fullData.push({
      text: text,
      date: date
    });

    this.setState({
      data: this.fullData
    })
  }

  render() {
    console.log(this.state.filterTextValue);
    return (
      <div className="App">
        <Form className="form-add" inputs={{
            inputText: {
              defaultValue: '',
              placeholder: 'add',
              type: 'text',
              required: true
            },
            inputDate: {
              defaultValue: new Date().toLocaleDateString(),
              type: 'date',
              required: true
            },
            inputSubmit: {
              value: 'Submit',
              type: 'submit'
            }
          }} onSubmit={(e) => this.handleFormAddSubmit(e)}/>
        <List className="list" data={this.state.data} onClick={(e) => this.handleListClick(e)}/>
        <Form className="form-filter" inputs={{
            inputText: {
              value: this.state.filterTextValue,
              placeholder: 'filter',
              type: 'text',
              onChange: this.handleTextFilterChange
            },
            inputDateFrom: {
              value: this.state.filterDateFromValue,
              type: 'date',
              onChange: this.handleDateFromFilterChange
            },
            inputDateTo: {
              value: this.state.filterDateToValue,
              type: 'date',
              onChange: this.handleDateToFilterChange
            },
            inputDropFilters: {
              value: 'Drop',
              type: 'submit',
            }
          }} onSubmit={() => this.handleFiltersDrop()}
         />
      </div>
    );
  }
}

export default App;
