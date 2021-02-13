import {
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    UPDATE_CATEGORY_NAME,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    ADD_TAG,
    REMOVE_TAG,
    UPDATE_TAG,
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
                    tags: action.tags,
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
                    tags: action.tags, //TODO: check
                },
            };

        case REMOVE_TAG:
            //TODO
            return state;
        default:
            return state
    }
}

const tagsById = (state = {}, action) => {
    switch (action.type) {
        case ADD_TAG:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: action.name,
                    items: [],
                    colour: action.colour,
                },
            };
        case REMOVE_TAG:
            const { [action.id]: removedItem, ...rest } = state;
            return rest;
        case UPDATE_TAG:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    name: action.name,
                    colour: action.colour,
                },
            };
        case ADD_ITEM:
        case REMOVE_ITEM:
            //TODO: How will we find correct tags? look throught all?

            // return {
            //     ...state,
            //     [action.categoryId]: {
            //         ...state[action.categoryId],
            //         items: items(state[action.categoryId].items, action),
            //     },
            // };
            return state;
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

        case ADD_TAG:
        case REMOVE_TAG:
        case UPDATE_TAG:
            return {
                ...state,
                itemsById: itemsById(state.itemsById, action),
                tagsById: tagsById(state.tagsById, action),
            };
        default:
            return state
    }
}

//TODO possibly write tests for these reducers

export default pageReducers; //TODO: consider rename
