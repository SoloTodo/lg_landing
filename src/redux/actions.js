import { fetchJson } from '../react-utils/utils';

export const loadRequiredProducts = dispatch => {
  let endPointUrl = 'lg_pricing/product_entries/';

  return fetchJson(endPointUrl).then(values => {
      const productEntries = [];

      for (const productEntry of values) {
          const entities = productEntry.entities;
          if (!entities.length) {
              continue
          }

          productEntries.push({
              product: productEntry.product,
              entities,
              customFields: productEntry.custom_fields
          })
      }

      dispatch({
          type: 'setProductEntries',
          productEntries: productEntries
      });
  });
};

export const setModalProduct = product => {
    return {
        type: 'setModalProduct',
        modalProduct: product
    }
};

export const initializeFilters = category => {
    return {
        type: 'initializeFilters',
        category
    }
};

export const emptyFilters = () => {
    return {
        type: 'emptyFilters'
    }
};

export const toggleFilter = (filterName, filter) => {
    return {
        type: 'toggleFilter',
        filterName,
        filter
    }
};


export const setScroll = (scroll) => {
    return {
        type: 'setScroll',
        scroll
    }
}