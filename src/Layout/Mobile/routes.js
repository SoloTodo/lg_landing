import React from 'react';
import Category from "../../views/Category";
import Search from "../../views/Search";

const routes = [
    { path: '/', exact: true, name: 'Inicio', render: props => <Category name='Home'/> },
    { path: '/celulares', exact: true, name: 'Celulares', render: props => <Category name='Cell'/> },
    { path: '/lavadoras', exact: true, name: 'Lavadoras', render: props => <Category name='WashingMachine'/> },
    { path: '/televisores', exact: true, name: 'Televisores', render: props => <Category name='Television'/> },
    { path: '/refrigeradores', exact: true, name: 'Refrigeradores', render: props => <Category name='Refrigerator'/> },
    { path: '/search', exact: true, name: 'Búsqueda', render: props => <Search/> }
];

export default routes