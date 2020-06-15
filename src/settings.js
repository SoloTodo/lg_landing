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
                key: "custom_attr_1_str"
            },
            {
                name: "Tipo de pantalla",
                key: "screen_type"
            }
        ],
        "Televisores": [
            {
                name: "Panel",
                key: "custom_attr_1_str"
            },
            {
                name: "Tamaño",
                key: "size_family_unicode"
            },
            {
                name: "Resolución",
                key: "resolution_commercial_name"
            }
        ],
        'Lavadoras y Secadoras': [
            {
                name: 'Tipo carga',
                key: 'w_format_unicode'
            },
            {
                name: 'Tecnología',
                key: 'custom_attr_1_str'
            }
        ],
        'Refrigeradores': [
            {
                name: 'Tipo',
                key: 'r_format_unicode'
            },
            {
                name: 'Tecnología',
                key: 'custom_attr_1_str'
            },
            {
                name: 'Eficiencia energética',
                key: 'energy_efficiency_unicode'
            }
        ]
    },

    categorySpecs: {
        'Celulares': [
            {'key': 'color_name', 'name': 'Color'},
            {'key': 'custom_attr_4_str', 'name': 'Procesador'},
            {'key': 'internal_storage_unicode', 'name': 'Almacenamiento'},
            {'key': 'ram_unicode', 'name': 'RAM'},
            {'key': 'custom_attr_5_str', 'name': 'Cámaras'},

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
            {'key': 'capacity_unicode', 'name': 'Capacidad lavado'},
            {'key': 'drying_capacity_unicode', 'name': 'Capacidad secado'},
            {'key': 'custom_attr_2_str', 'name': 'Color'},
            {'key': 'custom_attr_3_str', 'name': 'ThinQ'},
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