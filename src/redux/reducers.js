import {settings} from "../settings";

export function productEntriesReducer (state=null, action) {
    if (action.type === 'setProductEntries') {
        return action.productEntries
    }
    return state
}

export function modalProductReducer (state=null, action) {
    if (action.type === 'setModalProduct') {
        return action.modalProduct
    }
    return state
}

export function filterReducer (state=null, action) {

    if (action.type === 'initializeFilters') {
        const category = action.category;
        const filters = settings.categoryFilters[category];
        const appliedFilters = {};

        if (filters) {
            for (const filter of filters) {
                appliedFilters[filter.name] = []
            }
        } else {
            return null
        }

        return appliedFilters
    }

    if (action.type === 'toggleFilter') {
        const newFilters = Object.assign({}, state);
        const filterName = action.filterName;
        const filter = action.filter;
        const oldLenght = newFilters[filterName].length

        newFilters[filterName] = newFilters[filterName].filter(filterCompare => {
            return filter.option !== filterCompare.option;
        })

        if (newFilters[filterName].length === oldLenght) {
            newFilters[filterName] = [...newFilters[filterName], filter]
        }

        return newFilters
    }

    if (action.type === 'emptyFilters') {
        return null
    }

    return state
}