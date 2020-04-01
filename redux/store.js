import { createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
  createResponsiveStateReducer,
  responsiveStoreEnhancer
} from "redux-responsive";

import {
  apiResourceObjectsReducer
} from "../src/react-utils/redux/reducers";

export function initializeStore () {
  return createStore(
    combineReducers({
      apiResourceObject: apiResourceObjectsReducer,
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