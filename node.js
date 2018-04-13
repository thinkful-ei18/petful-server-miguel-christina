'use strict';

class _QNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

module.exports = _QNode;