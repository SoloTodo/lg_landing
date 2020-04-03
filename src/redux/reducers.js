export function productEntriesReducer (state=null, action) {
    if (action.type === 'setProductEntries') {
        return action.productEntries
    }

    return state
}