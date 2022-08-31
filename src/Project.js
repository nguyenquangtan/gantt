import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import GanttProject from './components/GanttProject';
import Toolbar from './components/Toolbar';
import { colors, content, er, log, mc, pr, tech } from './Color';
import { db } from "./firebase";

const getDateOnly = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

const getTimeOnly = (date) => {
    let H = String(date.getHours()).padStart(2, '0');
    let i = String(date.getMinutes()).padStart(2, '0');
    let S = String(date.getSeconds()).padStart(2, '0');
    return H + ':' + i + ':' + S;
}

const getTeamColor = (team) => {
    if (team === 'tech') {
        return tech.main;
    }
    else if (team === 'content') {
        return content.main;
    }
    else if (team === 'pr') {
        return pr.main;
    }
    else if (team === 'log') {
        return log.main;
    }
    else if (team === 'mc') {
        return mc.main;
    }
    else if (team === 'er') {
        return er.main;
    }
}

const getTaskColor = (teams) => {
    if (!teams)
        return "blue";
    return getTeamColor(teams[0]);
}

const Project = () => {

    const [currentZoom, setCurrentZoom] = useState(localStorage.getItem('zoomMode') || 'Days');
    const [data, setData] = useState([]);

    const handleZoomChange = (zoom) => {
        setCurrentZoom(zoom)
    }

    const convertDateToString = (date) => {
        return getDateOnly(date) + ' ' + getTimeOnly(date);
    }

    const temp = () => {

    }

    useEffect(() => {
        console.log()
    }, [data])

    useEffect(() => {
        db.collection("projects").get().then(res => {
            res.forEach(doc => {
                setData(prev => {
                    return [...prev, {
                        id: doc.id,
                        text: doc.data().name,
                        type: 'project',
                        open: true,
                        color: getTaskColor(doc.data().team)
                    }]
                })
            });
        })
        db.collection("tasks").get().then(res => {
            res.forEach(doc => {
                setData(prev => ([...prev, {
                    id: doc.id,
                    text: doc.data().name,
                    start_date: convertDateToString(new Date(doc.data().start.toDate())),
                    end_date: convertDateToString(new Date(doc.data().end.toDate())),
                    parent: doc.data().pID,
                    color: getTaskColor(doc.data().team)

                }]))
            })
        })
    }, [])

    return <div>
        <div className="zoom-bar">
            <Toolbar
                zoom={currentZoom}
                onZoomChange={handleZoomChange}
            />
        </div>
        <div className="gantt-project-container">
            {data.length !== 0 &&
                <GanttProject
                    tasks={{
                        data
                    }}
                    zoom={currentZoom}
                />
            }

        </div>
    </div>

}

export default withRouter(Project);
