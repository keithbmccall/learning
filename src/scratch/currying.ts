const boom = (a: string) => {
    console.log("a was set with", a);
    return (b: number) => {
        console.log("b was set with", b);
        const bPlus = b * 12;
        return (c: string) => {
            console.log("we got to c with", { a, b, c });
            return `${a} and ${b} and ${c} with b getting stretched to ${bPlus}`;
        };
    };
};
const bloop = boom("dummy");
const blouwe = bloop(33);
const bling = blouwe("sticks");
console.log(bling);
