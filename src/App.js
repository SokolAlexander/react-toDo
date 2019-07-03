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
        checked: true,
        index: 0
      },
      {
        date: '2019-04-30',
        text: 'blablabla',
        index: 1
      }],
      addTextValue: '',
      addDateValue: '',
      filterTextValue: 1,
      filterDateFromValue: '2010-04-29',
      filterDateToValue: '2019-04-29',
      isSortedBy: {
        text: false,
        date: false
      }
    }

    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    this.handleTextAddChange = this.handleTextAddChange.bind(this);
    this.handleDateAddChange = this.handleDateAddChange.bind(this);
    this.handleFiltersDrop = this.handleFiltersDrop.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this)

    this.fullData = this.state.data.slice();
    this.listActions = {
      'check': this.checkItem.bind(this),
      'delete': this.deleteItem.bind(this),
      'sortByText': this.sortByText.bind(this),
      'sortByDate': this.sortByDate.bind(this),
    }
  }

  checkItem(index) {
    let data = this.state.data.slice();
    data.forEach((item) => {
      if (item.index === parseInt(index)) item.checked = !item.checked
    })
    this.setState({
      data: data
    });
  }

  deleteItem(index) {
    let data = this.state.data.slice();
    data = data.filter((item) => item.index !== parseInt(index));
    this.fullData = this.fullData.filter((item) => item.index !== parseInt(index));
    this.setState({
      data: data
    })
  }

  sortByDate() {
    this.sortBy('date');
  }

  sortByText() {
    this.sortBy('text');
  }

  sortBy(field) {
    let data = this.state.data.slice();
    if (this.state.isSortedBy[field]) {
      data.reverse();
      } else {data.sort((a, b) => a[field] < b[field] ? -1 : 1);
    };

    this.setState({
      data: data,
      isSortedBy: {
        [field]: true
      }
    });
  }

  handleListClick(e) {
    if (e.target.dataset.action === undefined) return
    this.listActions[e.target.dataset.action](e.target.parentNode.dataset.index)
  }

  handleDateAddChange(e) {
    let date = e.target.value;
    this.setState({
      addDateValue: date
    })
  }

  handleTextAddChange(e) {
    let text = e.target.value;
    this.setState({
      addTextValue: text
    })
  }

  handleDateFilterChange(e) {
    let dateFrom = e.target.parentNode.querySelectorAll('input[type=date]')[0].value;
    let dateTo = document.querySelectorAll('input[type=date]')[0].value;

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
      data: data,
      filterTextValue: ''
    })
  }

  handleFiltersDrop() {
    let data = this.fullData;
    let mm = this.minAndMaxDates(data);
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
    let text = this.state.addTextValue;
    let date = this.state.addDateValue;
    let index = this.getNextIndex();
    let newItem = {
      text: text,
      date: date,
      index: index
    };

    let data = this.state.data.slice();
    data.push(newItem);
    this.fullData.push(newItem);

    let {min, max} = this.minAndMaxDates(this.fullData);

    this.setState({
      data: data,
      addDateValue: '',
      addTextValue: '',
      filterDateFromValue: min.date,
      filterDateToValue: max.date,
      isSortedBy: {
        text: false,
        date: false
      }
    })
  }

  getNextIndex() {
    let max = {
      index: 0
    };
    this.state.data.map((item) => {
      if (item.index > max.index) {
        max = item;
      } 
    });
    console.log(max.index + 1)
    return max.index + 1
  }

  minAndMaxDates(array) {
    let max = array[0]; 
    let min = array[0];
    array.forEach(item => {
      if (this.compareDates(item.date, min.date)) {
        min = item;
      } else if (this.compareDates(max.date, item.date)) {
        max = item;
      }
    });
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
    return (
      <div className="App">
        <Form className="form-add" inputs={{
            inputText: {
              value: this.state.addTextValue,
              placeholder: 'add',
              type: 'text',
              required: true,
              onChange: this.handleTextAddChange
            },
            inputDate: {
              value: this.state.addDateValue,
              type: 'date',
              required: true,
              onChange: this.handleDateAddChange
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
