class Thing {
    lib: Record<string, string>;
    constructor() {
        this.lib = {};
    }
    set(item: string, value: string) {
        this.lib[item] = value;
    }
    get(item: string) {
        return this.lib[item];
    }
    on(key: string, callback: () => void) {}
}

const thing = new Thing();

thing.set("cyclops", "Scott Summers");
thing.set("spiderman", "Peter Parker");

const cyclops = thing.get("cyclops");
const spiderman = thing.get("spiderman");

console.log(cyclops);
console.log(spiderman);

let store = new StoreData();

store.add("name", "joe");
store.add("age", 30);
console.log(store.has("age")); // return true
console.log(store.has("animal")); // return false
store.add("name", "emma");
// Change event
store.on("change:name", (old_val, new_val, key) => {
    console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
// Trigger the change event above
store.add("name", "john");
// Data event
store.on("age", (old_val, new_val, key) => {
    console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
});
// Trigger the data event above
store.add("age", 26);
// Change event
store.on("change:age", (old_val, new_val, key) => {
    console.log(`${old_val > new_val ? "older now" : ""}`);
});
// Trigger the change event above
store.add("age", 28);
// Trigger the change event above
store.add("age", 45);
