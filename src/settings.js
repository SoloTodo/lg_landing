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
        6: [
            {
                name: "Serie",
                key: "custom_attr_1_str"
            },
            {
                name: "Tipo de pantalla",
                key: "screen_type"
            }
        ],
        11: [
            {
                name: "Panel",
                key: "custom_attr_1_str"
            },
            {
                name: "Tamaño",
                key: "size_family_lg_cl_segment_unicode",
                order: "size_family_lg_cl_segment_ordering"
            },
            {
                name: "Resolución",
                key: "resolution_commercial_name"
            }
        ],
        19: [
            {
                name: 'Capacidad',
                key: 'lg_cl_capacity_segment'
            },
            {
                name: 'Tipo carga',
                key: 'w_format_unicode'
            },
            {
                name: 'Tecnología',
                key: 'custom_attr_1_str'
            }
        ],
        15: [
            {
                name: 'Capacidad',
                key: 'lg_cl_total_capacity_segment'
            },
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
        6: [
            {'key': 'color_name', 'name': 'Color'},
            {'key': 'custom_attr_4_str', 'name': 'Procesador'},
            {'key': 'internal_storage_unicode', 'name': 'Almacenamiento'},
            {'key': 'ram_unicode', 'name': 'RAM'},
            {'key': 'custom_attr_5_str', 'name': 'Cámaras'},

        ],
        11: [
            {'key': 'resolution_commercial_name', 'name': 'Resolución'},
            {'key': 'custom_attr_2_str', 'name': 'Procesador'},
            {'key': 'custom_attr_3_str', 'name': 'Sistema Operativo'},
            {'key': 'custom_attr_4_str', 'name': 'Sonido'},
            {'key': 'custom_attr_5_str', 'name': 'Magic Remote'},
        ],
        15: [
            {'key': 'r_format_unicode', 'name': 'Tipo'},
            {'key': 'custom_attr_1_str', 'name': 'Tecnología principal'},
            {'key': 'custom_attr_3_str', 'name': '¿ThinQ?'},
            {'key': 'custom_attr_4_str', 'name': 'Motor'},
            {'key': 'energy_efficiency_unicode', 'name': 'Eficiencia energética'},
            {'key': 'custom_attr_5_str', 'name': 'USP Estratégico'},

        ],
        19: [
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
                initializeFilters(11),
                toggleFilter('Panel', {option: "OLED"}),
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
    },
    categoryAnalyticsKeys: [6, 7],
    categoryAnalyticsSpecs: {
        11: ['display_unicode', 'size_family_lg_cl_segment_unicode'],
        15: ['r_format_unicode', 'door_style_unicode'],
        17: ['o_type_unicode'],
        19: ['w_type_unicode', 'w_format_unicode'],
        25: ['category_unicode'],
        26: ['category_unicode'],
        43: ['type_unicode', 'cooling_power_btu_unicode'],
        45: ['categoria_unicode'],
        50: ['type_unicode']
  },
};