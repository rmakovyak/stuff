import React from 'react';
import Task from './Task';
import './TaskList.css';

export default class TaskList extends React.Component {
    static defaultProps = {
        onComplete: () => null
    }

    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ tasks: nextProps.tasks });
    }

    render() {
        return (
            <div className='task-list'>
                {this.state.tasks.map(task => 
                    <Task task={task} onComplete={this.props.onComplete}/>
                )}
            </div>
        )
    }
}