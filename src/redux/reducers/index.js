import {
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    UPDATE_CATEGORY_NAME,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
} from '../actions'

const subpage = (state = [], action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return [
                ...state,
                action.id,
            ];
        case REMOVE_CATEGORY:
            return state.filter(categoryId => categoryId !== action.id);
        default:
            return state
    }
}

const categoriesById = (state = {}, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: action.name,
                    items: [],
                },
            };
        case REMOVE_CATEGORY:
            //TODO: need to check this work
            const { [action.id]: removedCategory, ...rest } = state;
            return rest;
        case UPDATE_CATEGORY_NAME:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    name: action.name,
                },
            };
        case ADD_ITEM:
        case REMOVE_ITEM:
            return {
                ...state,
                [action.categoryId]: {
                    ...state[action.categoryId],
                    items: items(state[action.categoryId].items, action),
                },
            };
        default:
            return state
    }
}

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                action.id,
            ];
        case REMOVE_ITEM:
            return state.filter(id => id !== action.id);
        default:
            return state
    }
}

const itemsById = (state = {}, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: action.name,
                    value: action.value,
                },
            };
        case REMOVE_ITEM:
            const { [action.id]: removedItem, ...rest } = state;
            return rest;
        case UPDATE_ITEM:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    name: action.name,
                    value: action.value,
                },
            };
        default:
            return state
    }
}

const pageReducers = (state = [], action) => {
    switch (action.type) {
        case ADD_CATEGORY:
        case REMOVE_CATEGORY:
        case UPDATE_CATEGORY_NAME:
            return {
                ...state,
                [action.subpageId]: subpage(state[action.subpageId], action),
                categoriesById: categoriesById(state.categoriesById, action),
                // itemsById: itemsById(state.itemsById, action), need to remove items if category doesn't exist...
            };
        case ADD_ITEM:
        case REMOVE_ITEM:
        case UPDATE_ITEM:
            return {
                ...state,
                categoriesById: categoriesById(state.categoriesById, action),
                itemsById: itemsById(state.itemsById, action),
            };
        default:
            return state
    }
}

//TODO possibly write tests for these reducers

export default pageReducers; //TODO: consider rename
