import State from './state.js';
import LinkedList from './linked-list.js';

export default class States {
  constructor(state) {
    this.state = new State(state);
    this.list = new LinkedList;
  }

  undo() {
    this.state = this.list.pop() || new State;
  }

  push(state) {
    const newState = this.state.set(state);

    this.list.push(this.state);
    this.state = newState;
  }

  get(key) {
    return this.state.get(key);
  }
}