
const sumItems = (items) => {
    return items.reduce((acc, currentItem) => {
        return acc + currentItem.value;
    }, 0);
}

export {
    sumItems,
}