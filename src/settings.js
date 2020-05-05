import {apiSettings} from "./react-utils/settings";
import {initializeFilters, toggleFilter, setModalProduct} from "./redux/actions";

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
                source: "customFields",
                source_key: "serie"
            },
            {
                name: "Tipo de pantalla",
                options: [
                  "HD",
                  "Full HD"
                ],
                type: "exact",
                source: "customFields",
                source_key: "screen_type"
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
                source: "specs",
                source_key: "battery_mah"
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
                source: "specs",
                source_key: "display_id"
            },
            {
                name: "RESOLUCION",
                options: {
                    "FULL HD": 1,
                    "UHD 4K": 2
                },
                type: "exact",
                source: "specs",
                source_key: "panel_type_unicode"
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
            display: "RECOMENDADO",
            sortFunction: (a,b) => {return 0}
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

    ],
    banners: [
        {
            src: "/banners/slide-1.png",
            actionName: "setModalProduct",
            action: setModalProduct(63424)
        },
        {
            src: "/banners/slide-2.png",
            url: "/televisores",
            actionName: "initializeFilters",
            actions: [
                initializeFilters('Television'),
                toggleFilter('TECNOLOGIA', {option: "OLED"})
            ]
        },
        {
            src: "/banners/slide-3.png",
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