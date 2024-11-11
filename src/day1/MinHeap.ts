export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (!this.length) {
            return -1;
        }
        const first = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return first;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return first;
    }
    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }
        const leftKidIndex = this.leftChild(idx);
        const rightKidIndex = this.rightChild(idx);
        if (leftKidIndex >= this.length) {
            return;
        }
        const leftKidValue = this.data[leftKidIndex];
        const rightKidValue = this.data[rightKidIndex];
        const currentValue = this.data[idx];
        if (leftKidValue > rightKidValue && currentValue > rightKidValue) {
            this.data[idx] = rightKidValue;
            this.data[rightKidIndex] = currentValue;
            this.heapifyDown(rightKidIndex);
        } else if (
            leftKidValue < rightKidValue &&
            currentValue > leftKidValue
        ) {
            this.data[idx] = leftKidValue;
            this.data[leftKidIndex] = currentValue;
            this.heapifyDown(leftKidIndex);
        }
    }

    private heapifyUp(idx: number): void {
        // will be called to bubble up a value from the bottom, all the way to the top!
        // or from the back of the heap array to the front of it
        if (idx === 0) {
            return;
        }
        const parentIndex = this.parent(idx);
        const parentValue = this.data[parentIndex];
        const currentValue = this.data[idx];
        if (parentValue > currentValue) {
            this.data[idx] = parentValue;
            this.data[parentIndex] = currentValue;
            this.heapifyUp(parentIndex);
        }
    }

    private parent(idx: number): number {
        return Math.floor(idx - 1 / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}

const arr = [1, 2, 3];
