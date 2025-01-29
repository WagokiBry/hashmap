class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(size = 11) { // Prime number for table size is a good practice
    this.table = new Array(size);
    this.size = size; // Store the size for later calculations
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.size; // Modulo to stay within table bounds
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.table[index]) {
      this.table[index] = new Node(key, value); // First node in the chain
    } else {
      let current = this.table[index];
      while (current.next) {
        if (current.key === key) { // Update existing value
          current.value = value;
          return;
        }
        current = current.next;
      }
      if (current.key === key) { // Check the last node as well
        current.value = value;
        return;
      }
      current.next = new Node(key, value); // Add new node to the chain
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.table[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined; // Key not found
  }

  has(key) {
    const index = this.hash(key);
    let current = this.table[index];

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  delete(key) {
    const index = this.hash(key);
    let current = this.table[index];
    let previous = null;

    while (current) {
      if (current.key === key) {
        if (previous === null) { // First node in the chain
          this.table[index] = current.next;
        } else {
          previous.next = current.next;
        }
        return true; // Successfully deleted
      }
      previous = current;
      current = current.next;
    }
    return false; // Key not found
  }

    // Helper function to visualize the hash map (for demonstration)
  print() {
    for (let i = 0; i < this.size; i++) {
      let bucket = "";
      let current = this.table[i];
      while (current) {
        bucket += `{${current.key}: ${current.value}} -> `;
        current = current.next;
      }
      console.log(`Bucket ${i}: ${bucket} null`);
    }
  }
}



// Example usage:
const myHashMap = new HashMap();
myHashMap.set("apple", 1);
myHashMap.set("banana", 2);
myHashMap.set("cherry", 3);
myHashMap.set("date", 4); // Example of possible collision

console.log(myHashMap.get("apple"));   // Output: 1
console.log(myHashMap.get("banana"));  // Output: 2
console.log(myHashMap.get("grape"));   // Output: undefined (not found)
console.log(myHashMap.has("cherry"));  // Output: true
myHashMap.delete("banana");
console.log(myHashMap.has("banana"));  // Output: false
myHashMap.print(); // Visualize the hashmap

myHashMap.set("app", 5); // Example of different key that might collide
myHashMap.print();
