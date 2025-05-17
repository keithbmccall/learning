import two_crystal_balls from "@code/TwoCrystalBalls";

test("two crystal balls", function () {
    const height = 10000000;
    let idx = Math.floor(Math.random() * height);
    const data = new Array(height).fill(false);

    for (let i = idx; i < height; ++i) {
        data[i] = true;
    }

    expect(two_crystal_balls(data)).toEqual(idx);
    expect(two_crystal_balls(new Array(821).fill(false))).toEqual(-1);
});
