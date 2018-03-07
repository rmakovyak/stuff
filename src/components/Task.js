import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import './Task.css';

class Task extends React.Component {
    static defaultProps = {
        onTaskUpdate: () => null
    }

    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            expanded: false,
            active: false,
            markedForCompletion: false
        };

        this.markComplete = this.markComplete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ task: nextProps.task });
    }

    handleClickOutside() {
        this.setState({ active: false, expanded: false });
    }

    markComplete(e) {
        e.stopPropagation();
        this.setState({
            markedForCompletion: true
        }, () => setTimeout(() =>
            this.props.onTaskUpdate({ ...this.state.task, completed: true }), 300));
    }

    render() {
        return (
            <div
                className={classNames(
                    'task',
                    { 'task--expanded': this.state.expanded },
                    { 'task--marked': this.state.markedForCompletion }
                )}
                onClick={() => this.setState({ expanded: true })}
            >
                {this.state.expanded ?
                    <form onSubmit={() => this.setState({ expanded: false })}>
                        <input
                            type='checkbox'
                            className='task__toggle'
                            onClick={this.markComplete}
                        />
                        <input
                            type='text'
                            className='input task__name-input'
                            value={this.state.task.name}
                            onChange={(e) => this.props.onTaskUpdate(
                                { ...this.state.task, name: e.target.value }
                            )}
                            placeholder='Task...'
                        />
                        <textarea
                            type='text'
                            value={this.state.task.notes}
                            onChange={(e) => this.props.onTaskUpdate(
                                { ...this.state.task, notes: e.target.value }
                            )}
                            placeholder='Notes...'
                            rows="3"
                            className='textarea task__notes'
                        />
                    </form>
                    :

                    <div>
                        <input
                            type='checkbox'
                            className='task__toggle'
                            onClick={this.markComplete}
                        />
                        <span className={classNames(
                            { 'task__strike': this.state.markedForCompletion })}>
                            {this.state.task.name}
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default enhanceWithClickOutside(Task);