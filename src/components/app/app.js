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
        item.timer = new Date(item.timer);
        item.timerShow = item.timer;
        item.time = formatDistanceToNow(item.realDate, { addSuffix: true });
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

  nonCompletedCount = () => {
    const { ToDoData } = this.state;

    return ToDoData.filter((el) => el.state !== 'completed').length;
  };

  timerStart = (id) => {
    this.setState(({ ToDoData }) => {
      const newData = [...ToDoData];
      newData.find((el) => {
        if (el.interval && el.interval !== 'pause') {
          return;
        }
        if (el.id === id) {
          if (el.timerShow.getMinutes() === 0 && el.timerShow.getSeconds() === 0) {
            el.timerShow = el.timer;
            el.interval = setInterval(() => {
              this.timerTick(id);
            }, 1000);
          } else {
            el.interval = setInterval(() => {
              this.timerTick(id);
            }, 1000);
          }
        }
      });
      return { ToDoData: newData };
    });
  };

  timerPause = (id) => {
    let idx = this.state.ToDoData.findIndex((el) => el.id === id);
    this.setState(({ ToDoData }) => {
      const newData = [...ToDoData];
      clearInterval(newData[idx].interval);
      newData[idx].interval = 'pause';
      return { ToDoData: newData };
    });
  };

  timerTick = (id) => {
    this.setState(({ ToDoData }) => {
      const findTimer = ToDoData.find((el) => {
        if (el.id === id) {
          return el;
        }
      });
      if (findTimer.timerShow.getMinutes() === 0 && findTimer.timerShow.getSeconds() === 0) {
        clearInterval(findTimer.interval);
        findTimer.interval = null;
        return;
      }
      const newData = [...ToDoData];
      findTimer.timerShow = new Date(findTimer.timerShow.getTime() - 1000);
      return { ToDoData: newData };
    });
  };

  delCompleted = () => {
    this.setState(
      (state) => {
        let newArr = state.ToDoData.filter((el) => {
          if (el.state === 'completed') {
            clearInterval(el.interval);
          }
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

  addTodo = (todo) => {
    let id = this.state.maxId + 1;
    this.setState(
      (state) => {
        let newTodo = {
          label: todo.label,
          realDate: new Date(),
          id: String(id),
          state: 'active',
          edit: false,
          timer: new Date(0, 0, 0, 0, todo.minute, todo.second),
          interval: null,
        };

        newTodo['time'] = formatDistanceToNow(newTodo['realDate'], { addSuffix: true });
        newTodo['timerShow'] = newTodo.timer;

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
          if (el.id === id) {
            clearInterval(el.interval);
          }
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

        const complitedTask = newData.find((el) => {
          if (el.id === id) {
            return el;
          }
        });

        clearInterval(complitedTask.interval);
        complitedTask.interval = 'pause';
        if (complitedTask.state === 'active') {
          complitedTask.state = 'completed';
        } else {
          complitedTask.state = 'active';
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
            timerStart={(id) => this.timerStart(id)}
            timerPause={(id) => this.timerPause(id)}
          />
          <Footer
            selectFilter={(filter) => {
              this.selectFilter(filter);
            }}
            delCompleted={this.delCompleted}
            count={this.nonCompletedCount()}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
