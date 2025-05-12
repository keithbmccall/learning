const isLegal = (
    dob: {
        month: number;
        day: number;
        year: number;
    },
    targetAge = 21,
): boolean => {
    const dateOfBirth = new Date(dob.year, dob.month - 1, dob.day).getTime();
    const dateNow = new Date();
    const targetDate = new Date(
        dateNow.getFullYear() - targetAge,
        dateNow.getMonth(),
        dateNow.getDate(),
    ).getTime();
    return dateOfBirth <= targetDate;
};
console.log(
    isLegal({
        month: 5,
        day: 11,
        year: 2004,
    }),
);

console.log(
    isLegal({
        month: 2,
        day: 12,
        year: 1987,
    }),
);

console.log(
    isLegal({
        month: 2,
        day: 12,
        year: 2015,
    }),
);

console.log(
    isLegal(
        {
            month: 2,
            day: 12,
            year: 2007,
        },
        18,
    ),
);

console.log(
    isLegal(
        {
            month: 2,
            day: 12,
            year: 2007,
        },
        21,
    ),
);
