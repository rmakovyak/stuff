import React from 'react';
import './CreateTask.css';

export default class CreateTask extends React.Component {
    static defaultProps = {
        onSubmit: () => null
    }

    static initState = {
        value: ''
    }

    constructor(props) {
        super(props);

        this.state = CreateTask.initState

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onCreate(this.state.value);
        this.setState(CreateTask.initState)
    }

    render() {
        return (
            <div className='create-task'>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        value={this.state.value}
                        onChange={(e) => this.setState({ value: e.target.value })}
                        placeholder='Add task...'
                        className='input'
                    />
                </form>
            </div>
        );
    }
}
