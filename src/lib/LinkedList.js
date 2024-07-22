class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  remove(value) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.value === value) {
        if (!previous) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        return;
      }
      previous = current;
      current = current.next;
    }
  }

  forEach(callback) {
    let current = this.head;
    while (current) {
      callback(current.value, this);
      current = current.next;
    }
  }
}
