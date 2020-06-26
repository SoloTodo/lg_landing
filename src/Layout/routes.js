import React from 'react';
import Category from "../views/Category";
import Search from "../views/Search";

const routes = [
    { path: '/', exact: true, name: 'Inicio', render: props => <Category {...props}/> },
    { path: '/celulares', exact: true, name: 'Celulares', render: props => <Category {...props} categoryId='6' /> },
    { path: '/lavadoras', exact: true, name: 'Lavadoras', render: props => <Category {...props} categoryId='19'/> },
    { path: '/televisores', exact: true, name: 'Televisores', render: props => <Category {...props} categoryId='11'/> },
    { path: '/refrigeradores', exact: true, name: 'Refrigeradores', render: props => <Category {...props} categoryId='15'/> },
    { path: '/search', exact: true, name: 'Búsqueda', render: props => <Search {...props}/> }
];

export default routes