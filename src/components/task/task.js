import React from "react";
import "./task.css";

class Task extends React.Component {

    state = {
        done: false
    }

    render () {
        const { label, time, setComplite, onDeleted, id, isChecked } = this.props;

        return (
            <div className="view">
                <input className="toggle" type="checkbox"
                onClick={() => setComplite(id)} 
                checked = {isChecked} />
                <label>
                    <span className={"description"}>{label}</span>
                    <span className="created">{time}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                onClick={() => onDeleted(id)}></button>
            </div>
        );
    }
}

export default Task;