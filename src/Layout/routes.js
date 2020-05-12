import React from 'react';
import Category from "../views/Category";
import Search from "../views/Search";

const routes = [
    { path: '/', exact: true, name: 'Inicio', render: props => <Category {...props} name='Home'/> },
    { path: '/celulares', exact: true, name: 'Celulares', render: props => <Category {...props} name='Cell'/> },
    { path: '/lavadoras', exact: true, name: 'Lavadoras', render: props => <Category {...props} name='WashingMachine'/> },
    { path: '/televisores', exact: true, name: 'Televisores', render: props => <Category {...props} name='Television'/> },
    { path: '/refrigeradores', exact: true, name: 'Refrigeradores', render: props => <Category {...props} name='Refrigerator'/> },
    { path: '/search', exact: true, name: 'Búsqueda', render: props => <Search {...props}/> }
];

export default routes