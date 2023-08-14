import React from "react";
import "./new-task-form.css";

class NewTaskForm extends React.Component {

    state = {
        label: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label.trim() === "") {
            return;
        }
        this.props.submitForm(this.state.label);
        this.setState({
            label: ""
          });
    }

    changeLabel = (e) => {
        this.setState({
          label: e.target.value
        });
      };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo" placeholder="What needs to be done?"
                        onChange={this.changeLabel}
                        value={this.state.label}/>
            </form>
        );
    };
};

export default NewTaskForm;