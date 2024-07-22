import LinkedList from "./LinkedList.js";

export default class PubSub {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new LinkedList());
    }
    this.subscribers.get(event).add(callback);
  }

  unsubscribe(event, callback) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).remove(callback);
    }
  }

  publish(event, data) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).forEach((callback) => callback(data));
    }
  }
}
