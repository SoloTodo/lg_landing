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