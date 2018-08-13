export default class LinkedList {
  constructor() {
    this._emptyNode = new EmptyNode;
    this._first = this._emptyNode;
    this._last = this._emptyNode;

  }

  pop() {
    const result = this._last.value;

    this._last.value = null;
    this._last = this._last.prev;
    this._last.next = this._emptyNode;

    if (this._last === this._emptyNode) {
      this._first = this._last;
    }

    return result;
  }

  shift() {
    const result = this._first.value;

    this._first.value = null;
    this._first = this._first.next;
    this._first.prev = this._emptyNode;

    if (this._first === this._emptyNode) {
      this._last = this._first;
    }

    return result;
  }

  push(item) {
    let newNode = new Node;

    newNode.value = item;

    this._last.next = newNode;

    newNode.prev = this._last;
    newNode.next = this._emptyNode;

    if (this._last === this._emptyNode) {
      this._first = newNode;
    }

    this._last = newNode;
  }

  unshift(item) {
    let newNode = new Node;

    newNode.value = item;

    this._first.prev = newNode;

    newNode.next = this._first;
    newNode.prev = this._emptyNode;

    if (this._first === this._emptyNode) {
      this._last = newNode;
    }

    this._first = newNode;
  }

  getFirst() {
    return this._first.value;
  }

  getLast() {
    return this._last.value;
  }
}

class Node {
  constructor() {
    this.prev = null;
    this.next = null;
    this.value = null;
  }
}

class EmptyNode {

  constructor() {
  }

  get prev() {
    return this;
  }

  set prev(node) {
  }

  get next() {
    return this;
  }

  set next(node) {
  }

  get value() {
    return null;
  }

  set value(item) {
  }
}