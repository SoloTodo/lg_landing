import {apiSettings} from "./react-utils/settings";
import {initializeFilters, toggleFilter, setModalProduct, setScroll} from "./redux/actions";

export const settings = {
    ...apiSettings,
    country: 1,
    currency: apiSettings.endpoint + 'currencies/1/',
    path: '/cl/landing',
    websiteId: 12,
    micrositeBrandId: 1,
    analyticsId: 'UA-137962556-3',
    lgTrackingName: 'lgecl',
    categoryFilters: {
        "Celulares": [
            {
                name: "Serie",
                options: [
                    "Serie K",
                    "Serie G",
                    "Serie Q"
                ],
                type: "exact",
                key: "custom_attr_1_str"
            },
            {
                name: "Tipo de pantalla",
                options: [
                  "HD",
                  "Full HD"
                ],
                type: "exact",
                key: "screen_type"
            },
            {
                name: "Batería",
                options: [
                  "3000 MAH",
                    "3500 MAH",
                    "4000 MAH"
                ],
                type: "range",
                range_data: {
                    "3000 MAH": [3000, 3499],
                    "3500 MAH": [3500, 3999],
                    "4000 MAH": [4000, 99999]
                },
                key: "battery_mah"
            }
        ],
        "Televisores": [
            {
                name: "Panel",
                options: [
                    'FHD', 'UHD', 'NanoCell', 'OLED'
                ],
                type: "exact",
                key: "custom_attr_1_str"
            },
            {
                name: "Tamaño",
                options: {
                    '32"': 281344,
                    '43"': 281366,
                    '49"': 281396,
                    '50"': 281403,
                    '55"': 281423,
                    '60"': 281432,
                    '65"': 281447,
                    '70"': 281453,
                    '75"': 281456,
                    '77"': 1002145,
                    '86"': 508018,
                },
                type: "exact",
                key: "size_id"
            },
            {
                name: "Resolución",
                options: {
                    "Full HD": 281535,
                    "UHD 4K": 281518
                },
                type: "exact",
                key: "resolution_id"
            }
        ]
    },

    categorySpecs: {
        'Celulares': [
            {'key': 'color_name', 'name': 'Color'},
            {'key': 'operating_system_unicode', 'name': 'Sistema Operativo'},
            {'key': 'internal_storage_unicode', 'name': 'Almacenamiento'},
            {'key': 'ram_unicode', 'name': 'RAM'}
        ],
        'Televisores': [
            {'key': 'resolution_commercial_name', 'name': 'Resolución'},
            {'key': 'custom_attr_2_str', 'name': 'Procesador'},
            {'key': 'custom_attr_3_str', 'name': 'Sistema Operativo'},
            {'key': 'custom_attr_4_str', 'name': 'Sonido'},
            {'key': 'custom_attr_5_str', 'name': 'Magic Remote'},
        ],
        'Refrigeradores': [
            {'key': 'r_format_unicode', 'name': 'Tipo'},
            {'key': 'custom_attr_1_str', 'name': 'Tecnología principal'},
            {'key': 'custom_attr_3_str', 'name': '¿ThinQ?'},
            {'key': 'custom_attr_4_str', 'name': 'Motor'},
            {'key': 'energy_efficiency_unicode', 'name': 'Eficiencia energética'},
            {'key': 'custom_attr_5_str', 'name': 'USP Estratégico'},

        ],
        'Lavadoras y Secadoras': [
            {'key': 'w_type_unicode', 'name': 'Categoría'},
            {'key': 'w_format_unicode', 'name': 'Tipo carga'},
            {'key': 'capacity_unicode', 'name': 'Capacidad lavado'},
            {'key': 'drying_capacity_unicode', 'name': 'Capacidad secado'},
        ],
    },

    orderOptions: [
        {   name: "recommended",
            display: "RECOMENDADOS",
            sortFunction: (a,b) => {return 0}
        },
        {   name: "lowToHigh",
            display: "PRECIO DE MENOR A MAYOR",
            sortFunction: (a, b) => {
                let entity1 = a.entities[0];
                for (const e of a.entities){
                    if (e.active_registry.offer_price < entity1.active_registry.offer_price) {
                        entity1 = e
                    }
                }
                let entity2 = b.entities[0];
                for (const e of b.entities){
                    if (e.active_registry.offer_price < entity2.active_registry.offer_price) {
                        entity2 = e
                    }
                }

                return entity1.active_registry.offer_price - entity2.active_registry.offer_price
            }
        },
        {   name: "highToLow",
            display: "PRECIO DE MAYOR A MENOR",
            sortFunction: (a, b) => {
                let entity1 = a.entities[0];
                for (const e of a.entities){
                    if (e.active_registry.offer_price < entity1.active_registry.offer_price) {
                        entity1 = e
                    }
                }
                let entity2 = b.entities[0];
                for (const e of b.entities){
                    if (e.active_registry.offer_price < entity2.active_registry.offer_price) {
                        entity2 = e
                    }
                }

                return entity2.active_registry.offer_price - entity1.active_registry.offer_price
            }
        }

    ],
    banners: [
        {
            src: "slide-1.png",
            type: "div",
            actionName: "setModalProduct",
            actions: [setModalProduct(63424)]
        },
        {
            src: "slide-2.png",
            type: "actionLink",
            url: "/televisores",
            actionName: "initializeFilters",
            actions: [
                initializeFilters('Televisores'),
                toggleFilter('TECNOLOGIA', {option: "OLED"}),
                setScroll(true)
            ]
        },
        {
            src: "slide-3.png",
            type: "link",
            url: "/"
        }
    ],

    storeBadges: {
        // 18: [
        //     {
        //         icon: "/badges/ico-truck.svg",
        //         text: "Despacho Gratis"
        //     },
        //     {
        //         icon: "/badges/ico-creditcard.svg",
        //         text: "6 cuotas sin interés"
        //     }
        // ]
    }
};