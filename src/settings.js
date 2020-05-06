import {apiSettings} from "./react-utils/settings";
import {initializeFilters, toggleFilter, setModalProduct, setScroll} from "./redux/actions";

export const settings = {
    ...apiSettings,
    country: 1,
    currency: apiSettings.endpoint + 'currencies/1/',
    categoryFilters: {
        "Cell": [
            {
                name: "Serie",
                options: [
                    "Serie K",
                    "Serie G",
                    "Serie Q"
                ],
                type: "exact",
                key: "serie"
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
        "Television": [
            {
                name: "TECNOLOGIA",
                options: {
                    'LED': 281170,
                    'NanoCell': 958742,
                    'OLED': 281176
                },
                type: "exact",
                key: "display_id"
            },
            {
                name: "TAMAÑO",
                options: {
                    '43"': 281366,
                    '49"': 281396,
                    '55"': 281423,
                    '65"': 281447,
                },
                type: "exact",
                key: "size_id"
            },
            {
                name: "RESOLUCION",
                options: {
                    "FULL HD": 281535,
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
            {'key': 'display_backlight', 'name': 'Tecnología'},
            {'key': 'resolution_commercial_name', 'name': 'Resolución'}
        ]
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
            src: "/banners/slide-1.png",
            type: "div",
            actionName: "setModalProduct",
            actions: [setModalProduct(63424)]
        },
        {
            src: "/banners/slide-2.png",
            type: "actionLink",
            url: "/televisores",
            actionName: "initializeFilters",
            actions: [
                initializeFilters('Television'),
                toggleFilter('TECNOLOGIA', {option: "OLED"}),
                setScroll(true)
            ]
        },
        {
            src: "/banners/slide-3.png",
            type: "link",
            url: "/"
        }
    ],

    storeBadges: {
        18: [
            {
                icon: "/badges/ico-truck.svg",
                text: "Despacho Gratis"
            },
            {
                icon: "/badges/ico-creditcard.svg",
                text: "6 cuotas sin interés"
            }
        ]
    }
};