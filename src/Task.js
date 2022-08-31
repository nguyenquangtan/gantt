import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GanttTask from './components/GanttTask';
import Toolbar from './components/Toolbar';
import './App.css';

function getDateOnly(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

function getTimeOnly(date) {
    var H = String(date.getHours()).padStart(2, '0'); 
    var i = String(date.getMinutes()).padStart(2, '0');    
    var S = String(date.getSeconds()).padStart(2, '0');
    return H + ':' + i + ':' + S;
}

class Task extends Component {
    state = {
        currentZoom: 'Days'
    };
  
    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }

    convertISOString(iso) {
        const date = new Date(iso);
        return getDateOnly(date) + ' ' + getTimeOnly(date);
    }

    getTasks() {
        const tasks = JSON.parse(localStorage.getItem('projects_and_tasks'));
        for (const task of tasks.data){
            if (task.hasOwnProperty('start_date'))
                task.start_date = this.convertISOString(task.start_date);
            if (task.hasOwnProperty('end_date'))
                task.end_date = this.convertISOString(task.end_date);
        }
        console.log(tasks);
        return tasks;
    }
    
    render() {
        const { currentZoom } = this.state;
        return (
            <div>
                <div className="zoom-bar">
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={this.handleZoomChange}
                    />
                </div>
                <div className="gantt-task-container">
                    <GanttTask
                        tasks={this.getTasks()}
                        projectID={localStorage.getItem('projectID')}
                        zoom={currentZoom}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Task);