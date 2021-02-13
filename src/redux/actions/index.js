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


export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';

/** Category Actions **/

let nextCategoryId = 0
export const addCategory = (subpageId, name) => ({
    type: ADD_CATEGORY,
    id: nextCategoryId++, // TODO: Should probably be a uuid or something
    subpageId,
    name,
});

export const removeCategory = (subpageId, id) => ({
    type: REMOVE_CATEGORY,
    subpageId,
    id,
});

//TODO: need to figure out if we want to pass more data to this (apart from just name)
export const updateCategory = (id, name) => ({
    type: UPDATE_CATEGORY_NAME,
    id,
    name,
});


/** Item Actions **/

let nextItemId = 0
export const addItem = (categoryId, name, value) => ({ //TODO: do I need to add Tags?
    type: ADD_ITEM,
    id: nextItemId++, // TODO: Should probably be a uuid or something
    categoryId,
    name,
    value,
    tags: [],
});

export const removeItem = (categoryId, id) => ({
    type: REMOVE_ITEM,
    categoryId,
    id,
});

export const updateItem = (id, name, value, tags) => ({
    type: UPDATE_ITEM,
    id,
    name,
    value,
    tags,
});


/** Tag Actions **/

let nextTagId = 0
export const addTag = (name) => ({
    type: ADD_TAG,
    id: nextTagId++, // TODO: Should probably be a uuid or something
    name,
    //TODO:: should this include the associated item(s)?
});

export const removeTag = (id) => ({
    type: REMOVE_TAG,
    id,
});

export const updateTag = (id, name, colour) => ({
    type: UPDATE_TAG,
    id,
    name,
    colour,
});
