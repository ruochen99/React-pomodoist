import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      item: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: this.state.nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };

    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      item: prevState.item.concat(newItem)
    })));
  }

  clearCompletedItems() {
    // TODO 7
    const items = this.state.item.filter(item => item.isCompleted === false);
    this.setState({
      item: items
    })
  }

  ifAnyCompleted() {
    const items = this.state.item;
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i].isCompleted === true) {
        return true;
      }
    }
    return false;
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    const items = this.state.item;
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items[i].sessionsCompleted +=1;
        items[i].isCompleted = true;
      }
    }
    this.setState({
      item: items
    });
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    const items = this.state.item;
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {

        items[i].isCompleted = items[i].isCompleted === true? false : true;
      }
    }
    this.setState({
      item: items
    });
  }

  startSession(id) {
    // TODO 4
    this.setState((prevState => ({
      sessionIsRunning: true,
      itemIdRunning: id
    })));
  }


  render() {
    const areItemsMarkedAsCompleted = this.ifAnyCompleted();
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted &&
            <ClearButton onClick={this.clearCompletedItems} />}
          </header>
            {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
              key={itemIdRunning}
            /> }
            <div>
            {this.state.item.length === 0 ? <EmptyState /> :
            <div className="items-container">
            {this.state.item.map((item) => (
              <TodoItem
                description={item.description}
                sessionsCompleted={item.sessionsCompleted}
                isCompleted={item.isCompleted}
                startSession={() => this.startSession(item.id)}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                key={item.id} />
            ))}
            </div>}
            </div>

        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
