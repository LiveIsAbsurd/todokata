import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

class App extends React.Component {
  state = {
    ToDoData: [],
    filter: 'All',
    maxId: 100,
  };

  componentDidMount() {
    if (localStorage.getItem('ToDoData') !== null) {
      const restoredState = JSON.parse(localStorage.getItem('ToDoData'));
      restoredState.ToDoData.forEach((item) => {
        item.realDate = new Date(item.realDate);
      });
      this.setState(restoredState);
    }
  }

  toDoRender = (todolist) => {
    let newTodolist = todolist.filter((el) => {
      if (this.state.filter === 'All') {
        return el;
      } else if (this.state.filter === 'Completed') {
        if (el.state === 'completed') {
          return el;
        }
      } else if (this.state.filter === 'Active') {
        if (el.state === 'active') {
          return el;
        }
      }
    });

    return newTodolist;
  };

  refreshTime = () => {
    this.setState((state) => {
      let newArr = [...state.ToDoData];

      newArr.map((el) => {
        el.time = formatDistanceToNow(el.realDate, { addSuffix: true });
        return el;
      });

      return { ToDoData: newArr };
    });
  };

  nonCompletedCount = () => {
    const { ToDoData } = this.state;

    return ToDoData.filter((el) => el.state !== 'completed').length;
  };

  delCompleted = () => {
    this.setState(
      (state) => {
        let newArr = state.ToDoData.filter((el) => {
          if (el.state !== 'completed') {
            return el;
          }
        });
        return (state.ToDoData = newArr);
      },
      () => {
        localStorage.setItem('ToDoData', JSON.stringify(this.state));
      }
    );
  };

  selectFilter = (filter) => {
    this.setState({ filter });
  };

  addTodo = (text) => {
    let id = this.state.maxId + 1;
    this.setState(
      (state) => {
        let newTodo = {
          label: text,
          realDate: new Date(),
          id: String(id),
          state: 'active',
          edit: false,
        };

        newTodo['time'] = formatDistanceToNow(newTodo['realDate'], { addSuffix: true });

        let newArr = [...state.ToDoData, newTodo];

        return { ToDoData: newArr, maxId: id };
      },
      () => {
        localStorage.setItem('ToDoData', JSON.stringify(this.state));
      }
    );
  };

  onDeleted = (id) => {
    this.setState(
      (state) => {
        let newData = state.ToDoData.filter((el) => {
          if (el.id !== id) {
            return el;
          }
        });

        return { ToDoData: newData };
      },
      () => {
        localStorage.setItem('ToDoData', JSON.stringify(this.state));
      }
    );
  };

  setComplite = (id) => {
    this.setState(
      (state) => {
        let newData = [...state.ToDoData];

        const idx = newData.findIndex((el) => {
          return el.id === id;
        });

        if (newData[idx].state === 'active') {
          newData[idx].state = 'completed';
        } else {
          newData[idx].state = 'active';
        }

        return { ToDoData: newData };
      },
      () => {
        localStorage.setItem('ToDoData', JSON.stringify(this.state));
      }
    );
  };

  editingTask = (id) => {
    this.setState((state) => {
      let newData = [...state.ToDoData];

      const idx = newData.findIndex((el) => {
        return el.id === id;
      });
      newData[idx].edit = true;
      return { ToDoData: newData };
    });
  };

  editTask = (id, label) => {
    this.setState(
      (state) => {
        let newData = [...state.ToDoData];

        const idx = newData.findIndex((el) => {
          return el.id === id;
        });
        newData[idx].label = label;
        newData[idx].edit = false;
        return { ToDoData: newData };
      },
      () => {
        localStorage.setItem('ToDoData', JSON.stringify(this.state));
      }
    );
  };

  render() {
    setInterval(() => {
      this.refreshTime();
    }, 1000);

    return (
      <section className="todoapp">
        <AppHeader submitForm={(text) => this.addTodo(text)} />

        <section className="main">
          <TaskList
            todos={this.toDoRender(this.state.ToDoData)}
            setComplite={(id) => this.setComplite(id)}
            onDeleted={(id) => this.onDeleted(id)}
            filter={this.state.filter}
            editingTask={(id) => this.editingTask(id)}
            editTask={(id, label) => this.editTask(id, label)}
          />
          <Footer
            selectFilter={(filter) => {
              this.selectFilter(filter);
            }}
            delCompleted={this.delCompleted}
            count={this.nonCompletedCount()}
          />
        </section>
      </section>
    );
  }
}

export default App;
