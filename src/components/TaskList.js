import React from 'react';
import Task from './Task';

export default class TaskList extends React.Component {
    static defaultProps = {
        onTaskUpdate: () => null
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
            <div>
                {this.state.tasks.map(task =>
                    <Task
                        task={task}
                        onTaskUpdate={this.props.onTaskUpdate}
                        key={task.id} />
                )}
            </div>
        )
    }
}