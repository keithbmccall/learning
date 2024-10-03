type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};
export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const newItem: Node<T> = {
            value: item,
        };
        this.length++;
        if (!this.head) {
            //
            this.head = newItem;
            return;
        }
        newItem.prev = this.head;
        this.head = newItem;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (!this.length) {
            const tempHead = this.head;
            this.head = undefined;
            return tempHead?.value;
        }
        const tempHead = this.head as Node<T>;
        this.head = tempHead.prev;
        return tempHead?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
