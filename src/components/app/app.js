import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import { Component } from 'react';

import './app.css';

class App extends Component{
  state = {
    data: [
      {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
      {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
      {name: 'Carl W.', salary: 5000, increase: false, rise: true, id: 3}
    ] ,
    term: '',
    filter: 'all',
  }

  deleteItem = (id) => {
    this.setState((state) => {
      return {
        data: state.data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    let maxId = [...this.state.data.sort((a, b) => b.id - a.id)][0].id;
    const newItem = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: ++maxId
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }

        return item;
      })
    }))
  }

  onChange = (e) => {
    this.setState({term: e.target.value})

  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  filterPost = (items, filter) => {
    switch (filter) {
        case 'rise':
            return items.filter(item => item.rise);
        case 'moreThen1000':
            return items.filter(item => item.salary > 1000);
        default:
            return items
    }
  }

  render() {
    const {data, term ,filter} = this.state;

    let visibleEmployees = data.filter(item => {
      return item.name.toLowerCase().includes(term.toLowerCase().trim());
    })

    const visibleEmployeesFilter = this.filterPost(visibleEmployees, filter)
  
    return (
      <div className="app">
          <AppInfo 
            count={data.length}
            countIncrease={data.filter(item => item.increase).length}
          />
  
          <div className="search-panel">
              <SearchPanel 
                term={term}
                onChange={this.onChange}
              />
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
          </div>
          
          <EmployeesList 
            data={visibleEmployeesFilter}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}
          />
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
