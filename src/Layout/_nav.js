export default {
    items: [
        {
            name: 'INICIO',
            button: true,
            button_name: 'TODOS',
            url: '/',
        },
        {
            name: 'CELULARES',
            button: true,
            button_name: 'CELULARES',
            url: '/celulares',
        },
        {
            name: 'LAVADORAS',
            button: true,
            button_name: 'LAVADORAS',
            button_parent_name: 'LINEA BLANCA',
            url: '/lavadoras',
        },
        {
            name: 'TELEVISORES',
            button: true,
            button_name: 'TELEVISORES',
            url: '/televisores'
        },
        {
            name: 'REFRIGERADORES',
            button: true,
            button_name: 'REFRIGERADORES',
            button_parent_name: 'LINEA BLANCA',
            url: '/refrigeradores'
        },
        {
            name: 'MONITORES',
            button: true,
            button_name: 'MONITORES',
            button_parent_name: 'COMPUTACIÓN',
            url: '/monitores'
        },
        {
            name: 'PROYECTORES',
            button: true,
            button_name: 'PROYECTORES',
            button_parent_name: 'COMPUTACIÓN',
            url: '/proyectores'
        }
    ]
}