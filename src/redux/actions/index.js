/* Should have : 
    ADD_CATEGORY - done
    REMOVE_CATEGORY - done
    UPDATE_CATEGORY_NAME - done
    
    ADD_ITEM
    REMOVE_ITEM
    UPDATE_ITEM

*/

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const UPDATE_CATEGORY_NAME = 'UPDATE_CATEGORY_NAME';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';


/** Category Actions **/

let nextCategoryId = 0
export const addCategory = (subpageId, name) => ({
    type: ADD_CATEGORY,
    id: nextCategoryId++,
    subpageId,
    name,
});

export const removeCategory = (subpageId, id) => ({
    type: REMOVE_CATEGORY,
    subpageId,
    id,
});

//TODO: need to figure out if we want to pass more daat to this (apart from just name)
export const updateCategoryName = (id, name) => ({
    type: UPDATE_CATEGORY_NAME,
    id,
    name,
});


/** Item Actions **/

let nextItemId = 0
export const addItem = (categoryId, name, value) => ({
    type: ADD_ITEM,
    id: nextItemId++,
    categoryId,
    name,
    value,
});

export const removeItem = (categoryId, id) => ({
    type: REMOVE_ITEM,
    categoryId,
    id,
});

export const updateItem = (id, name, value) => ({
    type: UPDATE_ITEM,
    id,
    name,
    value,
});
