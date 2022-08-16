import './employees-add-form.css';
import { Component } from 'react';

class EmployeesAddForm extends Component {
    state = {
        name: '',
        salary: '',
    }

    onValueChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name && !this.state.salary) {
            return
        }
        
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}
                >
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name='name'
                        value={name}
                        onChange={this.onValueChange}
                        
                    />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}
                        
                    />
    
                    <button 
                        type="submit"
                        className="btn btn-outline-light"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;