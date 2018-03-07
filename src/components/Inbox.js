import React from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import Moment from 'moment';

export default class Inbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }

        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    componentWillMount() {
        firebase.database().ref('tasks/').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                const allTasks = keys.map(key => data[key]);
                const inboxTasks = allTasks.filter(el => !el.completed);
                inboxTasks.sort((a, b) => {
                    const dateA = new Moment(a.timestamp);
                    const dateB = new Moment(b.timestamp);
                    return dateB.diff(dateA);
                })
                this.setState({
                    tasks: inboxTasks
                });
            }
        });
    }

    createTask(name) {
        if (name) {
            const task = { 
                id: uuid(),
                timestamp: new Date().getTime(), 
                name
            };
            firebase.database().ref(`tasks/${task.id}`).set({
                ...task
            });
        }
    }

    updateTask(task) {
        firebase.database().ref(`tasks/${task.id}`).set(task);
    }

    render() {
        return (
            <div>
                <h4 style={{ marginBottom: 20 }}><i className='fa fa-inbox'></i> Inbox</h4>
                <CreateTask onCreate={this.createTask} />
                <TaskList 
                    tasks={this.state.tasks} 
                    onTaskUpdate={this.updateTask}/>
            </div>
        );
    }
}
