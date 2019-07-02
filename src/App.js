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

    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    this.handleFiltersDrop = this.handleFiltersDrop.bind(this);

    this.fullData = this.state.data.slice();
  }

  handleListClick(e) {
    console.log(e.target);
  }

  handleDateFilterChange(e) {
    let dateFrom = document.querySelectorAll('input[type=date]')[1].value;
    let dateTo = document.querySelectorAll('input[type=date]')[2].value;

    this.setState({
      filterDateFromValue: dateFrom,
      filterDateToValue: dateTo
    })
  }

  handleFiltersSubmit() {
    let dateFrom = this.state.filterDateFromValue;
    let dateTo = this.state.filterDateToValue;

    let data = this.fullData.slice();
    data = data.filter(item => {
      return this.compareDates(dateFrom, dateTo, item.date) && 
        item.text.indexOf(this.state.filterTextValue) !== -1
    });

    this.setState({
      data: data
    })
  }

  handleFiltersDrop() {
    let data = this.fullData;
    let mm = this.minAndMax(data);
    let dateFrom = mm.min.date;
    let dateTo = mm.max.date;
    this.setState({
      data: data,
      filterDateFromValue: dateFrom,
      filterDateToValue: dateTo
    })
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

    let {min, max} = this.minAndMax(this.fullData);
    console.log(min.date, max.date)

    this.setState({
      data: this.fullData,
      filterDateFromValue: min.date,
      filterDateToValue: max.date
    })
  }

  minAndMax(array) {
    let max = array[0]; 
    let min = array[0];
    array.forEach(item => {
      if (this.compareDates(item.date, min.date)) {
        min = item;
      } else if (this.compareDates(max.date, item.date)) {
        max = item;
      }
    })
    return {min: min, max: max}
  }

  /**
   * returns true if targetDate is between dateFrom and dateTo,
   * if there's no targetDate retruns if dateFrom < dateTo
   * @param {*} dateFrom 
   * @param {*} dateTo 
   * @param {*} targetDate 
   */
  compareDates(dateFrom, dateTo, targetDate = null) {
    if (targetDate) {
    return (targetDate <= dateTo && targetDate >= dateFrom) ||
      (targetDate >= dateTo && targetDate <= dateFrom)
    }
    return dateFrom <= dateTo
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
              onChange: this.handleDateFilterChange
            },
            inputDateTo: {
              value: this.state.filterDateToValue,
              type: 'date',
              onChange: this.handleDateFilterChange
            }, 
            inputSubmitFilters: {
              value: 'filter',
              type: 'submit'
            },
            inputDropFilters: {
              value: 'Drop',
              type: 'button',
              onClick: this.handleFiltersDrop
            }
          }} onSubmit={(e) => {e.preventDefault(); this.handleFiltersSubmit(e)}}
         />
      </div>
    );
  }
}

export default App;
