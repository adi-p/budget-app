
const sumItems = (items) => {
    return items.reduce((acc, currentItem) => {

        if(isNaN(Number(currentItem.value)))
            return acc;
            
        return Number(acc + Number(currentItem.value));
    }, 0);
}

export {
    sumItems,
}