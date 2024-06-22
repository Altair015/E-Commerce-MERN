function rating(value) {
    let overallRating = value;
    const ratingValues = [];

    for (let i = 0; i < value; i++) {
        if (overallRating > 1) {
            ratingValues.push(100)
        }
        else {
            ratingValues.push(Math.trunc(overallRating * 100))
        }
        overallRating -= 1
    }
    return ratingValues;
}

console.log(rating(2.2))