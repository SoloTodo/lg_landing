import { createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
    createResponsiveStateReducer,
    responsiveStoreEnhancer
} from 'redux-responsive';

import {
    apiResourceObjectsReducer,
    loadedBundleReducer,
    loadedResourcesReducer
} from '../react-utils/redux/reducers';

import {
    filterReducer,
    modalProductReducer,
    productEntriesReducer, scrollReducer
} from './reducers';

export function initializeStore () {
    return createStore(
        combineReducers({
            apiResourceObjects: apiResourceObjectsReducer,
            loadedResources: loadedResourcesReducer,
            loadedBundle: loadedBundleReducer,
            productEntries: productEntriesReducer,
            modalProduct: modalProductReducer,
            appliedFilters: filterReducer,
            scroll: scrollReducer,
            browser: createResponsiveStateReducer({
                extraSmall: 575,
                small: 767,
                medium: 991,
                large: 1199,
            })
        }),
        composeWithDevTools(
            responsiveStoreEnhancer,
            applyMiddleware(thunkMiddleware)
        )
    )
}