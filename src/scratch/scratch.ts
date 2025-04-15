class StoreData {
    library: Map<string, string | number>;
    handlers: Map<
        string,
        Map<
            string,
            (
                old_val: string | number,
                new_val: string | number,
                key: string,
            ) => void
        >
    >;
    constructor() {
        this.library = new Map();
        this.handlers = new Map();
    }
    add(key: string, value: string | number) {
        const changeHandlers = this.handlers.get("change");
        const callback = changeHandlers?.get(key);

        const oldValue = this.library.get(key);
        callback?.(oldValue || "no previous value!", value, key);

        this.library.set(key, value);
    }
    has(key: string) {
        const requestHandlers = this.handlers.get("request");
        const callback = requestHandlers?.get(key);
        const value = this.library.get(key);
        callback?.(value || "no previous value!", value || "no new value", key);
        return !!this.library.get(key);
    }
    setHandler(
        action: string,
        event: string,
        callback: (
            old_val: string | number,
            new_val: string | number,
            key: string,
        ) => void,
    ) {
        const actionHandlers = this.handlers.get(action);
        if (actionHandlers) {
            actionHandlers.set(event, callback);
        } else {
            const handlerMap = new Map();
            handlerMap.set(event, callback);
            this.handlers.set(action, handlerMap);
        }
    }
    on(
        key: string,
        callback: (
            old_val: string | number,
            new_val: string | number,
            key: string,
        ) => void,
    ) {
        if (key.includes(":")) {
            const [action, event] = key.split(":");
            this.setHandler(action, event, callback);
        } else {
            this.setHandler("request", key, callback);
        }
    }
}

let store = new StoreData();

console.log(store.add("name", "joe"));
console.log(store.add("age", 30));
console.log(store.has("age")); // return true
console.log(store.has("animal")); // return false
console.log(store.add("name", "emma"));
// Change event
store.on("change:name", (old_val, new_val, key) => {
    console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
// Trigger the change event above
console.log(store.add("name", "john"));
// Data event
store.on("age", (old_val, new_val, key) => {
    console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
// Trigger the data event above
console.log(store.has("age"));
console.log(store.add("name", "jamel"));
// Change event
store.on("change:age", (old_val, new_val, key) => {
    console.log(`${old_val > new_val ? "older now" : ""}`);
});
// Trigger the change event above
console.log(store.add("age", 28));
// Trigger the change event above
store.add("age", 45);
console.log(store.handlers.get("change"));
