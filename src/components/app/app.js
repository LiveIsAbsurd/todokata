import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import AppHeader from '../app-header'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

class App extends React.Component {
  maxId = 100

  state = {
    ToDoData: [
      { label: 'Анжуманя', realDate: new Date(), time: formatDistanceToNow(new Date(), { addSuffix: true }), id: '1' },
      {
        label: 'Пресс качат',
        realDate: new Date(),
        time: formatDistanceToNow(new Date(), { addSuffix: true }),
        id: '2',
      }, //class: "editing"
      {
        label: 'Create React app',
        realDate: new Date(),
        time: formatDistanceToNow(new Date(), { addSuffix: true }),
        id: '3',
      },
    ],
    filter: 'All',
  }

  refreshTime = () => {
    this.setState((state) => {
      let newArr = [...state.ToDoData]

      newArr.map((el) => {
        el.time = formatDistanceToNow(el.realDate, { addSuffix: true })
        return el
      })

      return (state.ToDoData = newArr)
    })
  }

  nonCompletedCount = () => {
    const { ToDoData } = this.state

    return ToDoData.filter((el) => el.class !== 'completed').length
  }

  delCompleted = () => {
    this.setState((state) => {
      let newArr = []
      state.ToDoData.forEach((el) => {
        if (el.class !== 'completed') {
          newArr.push(el)
        }
      })
      return (state.ToDoData = newArr)
    })
  }

  selectFilter = (filter) => {
    this.setState({ filter })
  }

  addTodo = (text) => {
    this.setState((state) => {
      let newTodo = {
        label: text,
        realDate: new Date(),
        id: String(this.maxId++),
      }

      newTodo['time'] = formatDistanceToNow(newTodo['realDate'], { addSuffix: true })

      let newArr = [...state.ToDoData, newTodo]

      return (state.ToDoData = newArr)
    })
  }

  onDeleted = (id) => {
    this.setState((state) => {
      const idx = state.ToDoData.findIndex((el) => {
        return el.id === id
      })

      let newData = [...state.ToDoData.slice(0, idx), ...state.ToDoData.slice(idx + 1)]

      return (state.ToDoData = newData)
    })
  }

  setComplite = (id) => {
    this.setState((state) => {
      let newData = [...state.ToDoData]

      const idx = newData.findIndex((el) => {
        return el.id === id
      })

      if (!newData[idx].class) {
        newData[idx].class = 'completed'
      } else {
        newData[idx].class = ''
      }

      return (state.ToDoData = newData)
    })
  }

  render() {
    setInterval(() => {
      this.refreshTime()
    }, 5000)

    return (
      <section className="todoapp">
        <AppHeader submitForm={(text) => this.addTodo(text)} />

        <section className="main">
          <TaskList
            todos={this.state.ToDoData}
            setComplite={(id) => this.setComplite(id)}
            onDeleted={(id) => this.onDeleted(id)}
            filter={this.state.filter}
          />
          <Footer
            selectFilter={(filter) => {
              this.selectFilter(filter)
            }}
            delCompleted={this.delCompleted}
            count={this.nonCompletedCount()}
          />
        </section>
      </section>
    )
  }
}

export default App
