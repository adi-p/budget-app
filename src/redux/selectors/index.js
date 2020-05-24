
/* IDEA FOR  STATE
 state = {
     in: [], //array<categoryId>
     out: [], //array<categoryId>
     categoriesById: { }, //id -> category //where category is { id, name, items: []//array<itemId> }
     itemsById: { }, //id -> item //where item is { id, name, value }
 } 
*/

export const getItemById = (store, itemId) =>
    store.itemsById[itemId] ? store.itemsById[itemId] : {}

export const getCategoryById = (store, categoryId) =>
    store.categoriesById[categoryId] ? store.categoriesById[categoryId] : {} //should this return the actual items too?

export const getCategoryItems = (store, categoryId) =>
    store.categoriesById[categoryId] ? store.categoriesById[categoryId].items.map(id => getItemById(store, id)) : []; // should this return the whole items or just their ids?

export const getSubPageItems = (store, subpageType) =>
    store[subpageType] ? store[subpageType].reduce((itemAcc, currentCategoryId) => {
        return itemAcc.concat(getCategoryItems(store, currentCategoryId))
    }, []) : []; // IT is not obvious that store.in and store.out are arrays of categories, should make it more explicit

export const getSubPageCategories = (store, subpageType) =>
    store[subpageType] ? store[subpageType].map(categoryId => store.categoriesById[categoryId]) : [];
