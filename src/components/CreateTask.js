import React from 'react';
import './CreateTask.css';

export default class CreateTask extends React.Component {
    static defaultProps = {
        onSubmit: () => null
    }

    static initState = {
        name: '',
        notes: ''
    }

    constructor(props) {
        super(props);

        this.state = CreateTask.initState

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log('on submit');
        e.preventDefault();
        this.props.onCreate({ 
            name: this.state.name,
            notes: this.state.notes
        });
        this.setState(CreateTask.initState)
    }

    render() {
        return (
            <div className='create-task'>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        placeholder='New To-Do'
                        className='create-task__input'
                    />
                    <textarea 
                        type='text' 
                        value={this.state.notes}
                        onChange={(e) => this.setState({ notes: e.target.value })}
                        placeholder='Notes' 
                        rows="3"
                        className='create-task__textarea'
                    />
                </form>
            </div>
        );
    }
}
