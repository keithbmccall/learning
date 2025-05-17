# Kata Machine

A comprehensive collection of coding exercises (katas) and algorithm implementations for practicing technical interview preparation and improving algorithmic thinking.

## 🎯 Purpose

This repository serves as a structured learning environment for practicing common programming challenges, data structures, and algorithms. It's designed to help developers:

- Prepare for technical interviews
- Master fundamental data structures and algorithms
- Practice problem-solving skills
- Learn test-driven development (TDD)

## 🛠 Features

- Comprehensive test suite for each kata
- TypeScript implementation
- Jest testing framework
- Automated test running and validation
- Built-in prettier configuration for consistent code formatting

## 📚 Included Katas

The repository includes implementations and tests for various algorithms and data structures:

### Data Structures
- Singly Linked List
- Doubly Linked List
- Queue
- Stack
- ArrayList
- Binary Trees
- Trie
- Min Heap
- Map

### Algorithms
- Linear Search
- Binary Search
- Two Crystal Balls Problem
- Bubble Sort
- Quick Sort
- Maze Solver
- DFS (Depth-First Search)
  - On Binary Search Trees
  - On Graphs
- BFS (Breadth-First Search)
  - On Binary Trees
  - On Graph Matrix
- Binary Tree Traversals
  - Pre-order
  - In-order
  - Post-order

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Run Tests**
   ```bash
   yarn test
   ```

3. **Format Code**
   ```bash
   yarn prettier
   ```

## 📝 Scripts

- `yarn test` - Run tests for all implemented katas
- `yarn clear` - Clear previous implementations
- `yarn prettier` - Format code using prettier
- `yarn generate` - Generate new kata templates
- `yarn day` - Show current day's exercises
- `yarn autocompletion` - Run autocompletion tools

## 🔧 Technical Stack

- TypeScript
- Jest for testing
- Prettier for code formatting
- Custom test runners and generators

## 📚 Additional Resources

### Autocompletion Project
The `autocompletion` directory contains a standalone TypeScript application that provides:
- Interactive typing practice with autocompletion features
- Real-time feedback on typing accuracy and speed
- Modern Vite-based development environment
- TypeScript implementation with strict type checking

To run the autocompletion practice tool:
```bash
yarn autocompletion
```

### Interview Resources
The `interview-resources` directory contains comprehensive preparation materials:
- System design interview preparation guides and examples
- Behavioral interview questions and strategies
- Company-specific interview preparation materials (e.g., Airbnb)
- Best practices and common patterns for different interview types

These resources complement the kata exercises by providing:
- Real-world system design scenarios
- Behavioral interview preparation
- Company-specific interview formats and expectations
- Holistic interview preparation strategy

## 📄 License

MIT

---

Happy coding! 🚀

## Developed live on twitch
[ThePrimeagen](https://twitch.tv/ThePrimeagen)

## Naming
### Lig-Machine
Lengthy Instrumentation Generating Massive Anticompetitive Computational Help for Intermediate Coders // n9

### Ligmata
Literal Improvement Gaining Master and Tutelage on Algorithms
Let's Intelligently Generate Multiple Algorithm Training Assessments // permdaddy

### Sugma Nuts
Studious Users Get Major Abilities. New Useful Training for Students

### Ligma Farts
Learn Intermediate Groundbreaking Massive Algorithms. Free Algorithm Research & Training System


### If you have a suggestion
make an issue and we will come up with the potential name.

### WARNING
I have just started to add algorithms, so the number of supported algorithms is
limited at the moment, but will grow fairly quick.

### WARNING
OUT OF DATE.  We have quite a few more.  need to update
### Supported Algorithm
* Insertion sort
* Merge sort
* QuickSort
* Prim's MST (Adjacency List)
* Dijkstra's Shortest Path (Adjacency List)

### Supported Data Structures
* Singly linked list
* Doubly linked list
* Queue
* Stack
* Graph with Adjacency List
* Graph with Adjacency Matrix (untested)

### How It Works

Make sure you have [Node.js](https://nodejs.org/en/) and yarn installed: `npm install --global yarn`

clone the repo and install the dependencies

```bash
yarn install
```

edit the `ligma.config.js` file
```javascript
module.exports = {
    dsa: [
        "InsertionSort",
        "MergeSort",
        "Queue",
        "Stack",
        "QuickSort",
        "DijkstraList",
        "PrimsList",
    ],
}
```

create a day of katas, this will use the list in the `ligma.config.js`.
```bash
yarn generate
```

this will progressively create folders named

```
src/day1
src/day2
...
```

`yarn generate` will also update the `tsconfig.json` and `jest.config` to point
the latest `day` folder via tspaths.  This allows us to avoid updating anything
for testing each day.

#### Testing
```
yarn test
```

I have yet to create a testing strategy for next sets of algorithms, but we
will get there when i cross that bridge.

### Help wanted
A simple way to specify test, thinking something like `tests.json` and `cat
test.json 2> /dev/null` to specify the tests to run.  tests.json wouldn't be
committed.
