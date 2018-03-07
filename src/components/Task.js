import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import './Task.css';

class Task extends React.Component {
    static defaultProps = {
        onComplete: () => null
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
        }, () => setTimeout(() => this.props.onComplete(this.state.task), 300))
    }

    render() {
        return (
            <div
                className={classNames(
                    'task', 
                    { 'task--active': this.state.active},
                    { 'task--expanded': this.state.expanded },
                    { 'task--marked': this.state.markedForCompletion }
                )}
                onClick={() => this.setState({ active: !this.state.active })}
                onDoubleClick={() => this.setState({ expanded: true })}
            >
                <input
                    type='checkbox'
                    className='task__toggle'
                    onClick={this.markComplete}
                />
                <span className={classNames(
                    { 'task__strike': this.state.markedForCompletion })}>
                    {this.state.task.name}
                </span>
                {this.state.expanded ? this.state.task.notes : null}
            </div>
        )
    }
}

export default enhanceWithClickOutside(Task);