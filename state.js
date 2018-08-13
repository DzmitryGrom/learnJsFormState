export default class State {
  constructor(state, prevState) {
    this.state = state || {};

    this.state.__proto__ = prevState;
  }

  set(state) {
    return new State(state, this.state);
  }

  get(key) {
    return this.state[key];
  }
}