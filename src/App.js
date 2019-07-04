import React from 'react';
import Form from './components/form/form.js';
import List from './components/list/list.js';
import './App.css';

/**
 * Class represents an app for to-do list
 */
class App extends React.Component {
  /**
   * Create app, bind nessecary functions, set date field
   * @param {props} props properties
   */
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      addTextValue: '',
      filterTextValue: '',
      filterDateFromValue: '2010-04-29',
      filterDateToValue: '2019-04-29',
      isSortedBy: {
        text: false,
        date: false
      }
    }

    this.handleDateFromFilterChange = this.handleDateFromFilterChange.bind(this);
    this.handleDateToFilterChange = this.handleDateToFilterChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    this.handleTextAddChange = this.handleTextAddChange.bind(this);
    this.handleDateAddChange = this.handleDateAddChange.bind(this);
    this.handleFiltersDrop = this.handleFiltersDrop.bind(this);
    this._getNextIndex = this._getNextIndex.bind(this)

    this.listActions = {
      'check': this.checkItem.bind(this),
      'delete': this.deleteItem.bind(this),
      'sortByText': this.sortByText.bind(this),
      'sortByDate': this.sortByDate.bind(this),
    }
  }

  /**
   * gets date in yyyy-mm-dd format
   * @return {String} date
   */
  _getDateForForm() {
    const year = new Date().getFullYear();
    const month = ((new Date().getMonth()+1) < 10) ?
       ('0' + (new Date().getMonth()+1)) :
       (new Date().getMonth() + 1);
    const day = (new Date().getDate() < 10) ?
    ('0' + new Date().getDate()) :
    (new Date().getDate());

    return `${year}-${month}-${day}`;
  }

  /**
   * gets saved data from localStorage (if there is any),
   * sets date fields to the boundaries of data
   * copies data to full data
   */
  componentDidMount() {
    const data = [];
    for (const key in localStorage) {
      if (key.indexOf('react-app') === -1) continue;
      data.push(JSON.parse(localStorage.getItem(key)))
    };
    
    const today = this._getDateForForm();
    const mm = this._minAndMaxDates(data);
    const dateFrom = mm.min.date;
    const dateTo = mm.max.date;

    this.setState({
      data: data,
      filterDateFromValue: dateFrom,
      filterDateToValue: dateTo,
      addDateValue: today
    });

    this.fullData = data.slice();
  }

  /**
   * flags item as checked
   * @param {Number} index of item to check
   */
  checkItem(index) {
    const data = this.state.data.slice();
    let checkedItem;
    data.forEach((item) => {
      if (item.index === parseInt(index)) {
        item.checked = !item.checked;
        checkedItem = item;
      }
    });

    localStorage.setItem(index + '-react-app', JSON.stringify(checkedItem));
    this.setState({
      data: data
    });
  }

  /**
   * deletes item from data
   * @param {Number} index of item to delete
   */
  deleteItem(index) {
    let data = this.state.data.slice();
    data = data.filter((item) => item.index !== parseInt(index));
    this.fullData = this.fullData.filter((item) => item.index !== parseInt(index));
    localStorage.removeItem(index + '-react-app');
    this.setState({
      data: data
    })
  }

  /**
   * calls sortBy with field text
   */
  sortByDate() {
    this.sortBy('date');
  }

  /**
   * calls sortBy with field text
   */
  sortByText() {
    this.sortBy('text');
  }

  /**
   * sorts data by text or date
   * @param {String} field text or date
   */
  sortBy(field) {
    const data = this.state.data.slice();
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

  /**
   * handles click on List element, calls appropriate function
   * @param {Event} e event
   */
  handleListClick(e) {
    if (e.target.dataset.action === undefined) return
    this.listActions[e.target.dataset.action](e.target.parentNode.dataset.index)
  }

  /**
   * handles change of date input in Add form
   * @param {Event} e
   */
  handleDateAddChange(e) {
    const date = e.target.value;
    this.setState({
      addDateValue: date
    })
  }

  /**
   * handles change off text field in Add form
   * @param {Event} e
   */
  handleTextAddChange(e) {
    const text = e.target.value;
    this.setState({
      addTextValue: text
    })
  }

  /**
   * handles change of date filter 
   * @param {Event} e
   */
  handleDateFromFilterChange(e) {
    this._changeDateFilter(e.target.value, 'filterDateFromValue')
  }

   /**
   * handles change of dateTo filter
   * @param {Event} e
   */
  handleDateToFilterChange(e) {
    this._changeDateFilter(e.target.value, 'filterDateToValue')
  }

  /**
   * Set the field of state to value date
   * @param {String} date 
   * @param {String} field 
   */
  _changeDateFilter(date, field) {
    this.setState({
      [field]: date,
    })
  }

  /**
   * handles submitting of filters
   */
  handleFiltersSubmit() {
    const dateFrom = this.state.filterDateFromValue;
    const dateTo = this.state.filterDateToValue;

    let data = this.fullData.slice();
    data = data.filter(item => {
      return this._compareDates(dateFrom, dateTo, item.date) &&
        item.text.indexOf(this.state.filterTextValue) !== -1
    });

    this.setState({
      data: data,
      filterTextValue: ''
    })
  }

  /**
   * drops filters
   */
  handleFiltersDrop() {
    const data = this.fullData;
    const mm = this._minAndMaxDates(data);
    const dateFrom = mm.min.date;
    const dateTo = mm.max.date;
    this.setState({
      data: data,
      filterDateFromValue: dateFrom,
      filterDateToValue: dateTo
    })
  }

  /**
   * handles change of value of text input in Filter form
   * @param {Event} e 
   */
  handleTextFilterChange(e) {
    const value = e.target.value;
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
    });
  }

  /**
   * handles adding of item
   * @param {Event} e 
   */
  handleFormAddSubmit(e) {
    const text = this.state.addTextValue;
    const date = this.state.addDateValue;
    const index = this._getNextIndex();
    const newItem = {
      text: text,
      date: date,
      index: index
    };

    const data = this.state.data.slice();
    data.push(newItem);
    this.fullData.push(newItem);

    const {min, max} = this._minAndMaxDates(this.fullData);
    const today = this._getDateForForm();

    this.setState({
      data: data,
      addDateValue: today,
      addTextValue: '',
      filterDateFromValue: min.date,
      filterDateToValue: max.date,
      isSortedBy: {
        text: false,
        date: false
      }
    });

    localStorage.setItem(index + '-react-app', JSON.stringify(newItem));
  }

  /**
   * Find max index in data, return max+1
   * @return {Number}
   */
  _getNextIndex() {
    let max = {
      index: 0
    };
    // eslint-disable-next-line
    this.state.data.map((item) => {
      if (item.index > max.index) {
        max = item;
      }
    });
    return max.index + 1
  }

  /**
   * find min and max dates in data
   * @param {Array} array 
   * @return {Object}
   */
  _minAndMaxDates(array) {
    if (!array.length) return;
    let max = array[0];
    let min = array[0];
    array.forEach(item => {
      if (this._compareDates(item.date, min.date)) {
        min = item;
      } else if (this._compareDates(max.date, item.date)) {
        max = item;
      }
    });
    return {min: min, max: max}
  }

  /**
   * returns true if targetDate is between dateFrom and dateTo,
   * if there's no targetDate retruns if dateFrom < dateTo
   * @param {String} dateFrom
   * @param {String} dateTo
   * @param {String} targetDate
   * @return {Boolean} 
   */
  _compareDates(dateFrom, dateTo, targetDate = null) {
    if (targetDate) {
    return (targetDate <= dateTo && targetDate >= dateFrom) ||
      (targetDate >= dateTo && targetDate <= dateFrom)
    }
    return dateFrom <= dateTo
  }

  /**
   * render an app
   * @return {ReactComponent}
   */
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
              onChange: this.handleDateFromFilterChange
            },
            inputDateTo: {
              value: this.state.filterDateToValue,
              type: 'date',
              onChange: this.handleDateToFilterChange
            },
            inputSubmitFilters: {
              value: 'Filter',
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
