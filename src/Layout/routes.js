import React from 'react';
import Category from "../views/Category";
import Search from "../views/Search";

const routes = [
    { path: '/', exact: true, name: 'Inicio', render: props => <Category {...props} categoryName='Home'/> },
    { path: '/celulares', exact: true, name: 'Celulares', render: props => <Category {...props} categoryName='Celulares'/> },
    { path: '/lavadoras', exact: true, name: 'Lavadoras', render: props => <Category {...props} categoryName='Lavadoras y Secadoras'/> },
    { path: '/televisores', exact: true, name: 'Televisores', render: props => <Category {...props} categoryName='Televisores'/> },
    { path: '/refrigeradores', exact: true, name: 'Refrigeradores', render: props => <Category {...props} categoryName='Refrigeradores'/> },
    { path: '/search', exact: true, name: 'Búsqueda', render: props => <Search {...props}/> }
];

export default routes