import React from "react";
import AppHeader from "../app-header";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow"; 
const date = new Date();

class App extends React.Component {

  state = {
    ToDoData: [
      {label: "Completed task", time: formatDistanceToNow(date, { addSuffix: true }), id: "1"},
      {label: "Editing task", time: formatDistanceToNow(date, { addSuffix: true }), id: "2"}, //class: "editing"
      {label: "Active task", time: formatDistanceToNow(date, { addSuffix: true }), id: "3"}
    ]
  };

  onDeleted = (id) => {
    this.setState((state) => {
      const idx = state.ToDoData.findIndex((el) => {
        return el.id === id;
      });

      let newData = [
        ...state.ToDoData.slice(0, idx),
        ...state.ToDoData.slice(idx + 1)
      ];

      return state.ToDoData = newData;
    });
  };

  setComplite = (id) => {
    this.setState((state) => {
      let newData = [...state.ToDoData];

      const idx = newData.findIndex((el) => {
        return el.id === id;
      });

      if (!newData[idx].class) {
        newData[idx].class = "completed";
      } else {
        newData[idx].class = "";
      }
      

      return state.ToDoData = newData;
    });
  }

  render () {

    return (
      <section className="todoapp">
        <AppHeader />
  
        <section className="main">
          <TaskList 
          todos = {this.state.ToDoData}
          setComplite={(id) => this.setComplite(id)}
          onDeleted={(id) => this.onDeleted(id)}/>
          <Footer />
        </section>
      </section>
    );
  }
}


export default App;