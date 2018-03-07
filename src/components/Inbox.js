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
        this.completeTask = this.completeTask.bind(this);
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

    createTask(input) {
        if (input.name) {
            const task = { 
                id: uuid(),
                timestamp: new Date().getTime(), 
                ...input 
            };
            firebase.database().ref(`tasks/${task.id}`).set({
                ...task
            });
        }
    }

    completeTask(task) {
        firebase.database().ref(`tasks/${task.id}`).set({
            completed: true,
            ...task
        });
    }

    render() {
        return (
            <div>
                <h4 style={{ marginBottom: 40 }}><i className='fa fa-inbox'></i> Inbox</h4>
                <CreateTask onCreate={this.createTask} />
                <TaskList tasks={this.state.tasks} onComplete={this.completeTask}/>
            </div>
        );
    }
}
