type Node<T> = {
    value: T;
    next?: Node<T>;
};
export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        //push
        this.length++;
        const newItem = {
            value: item,
        };
        if (!this.tail) {
            this.tail = this.head = newItem;
            return;
        }

        this.tail.next = newItem;
        this.tail = newItem;
    }
    deque(): T | undefined {
        //pop
        if (!this.head) {
            return undefined;
        }
        this.length--;
        if (!this.length) {
            this.tail = undefined;
        }
        const tempHead = this.head;
        this.head = this.head.next;
        tempHead.next = undefined;

        // save head, update head, return 0
        return tempHead.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
