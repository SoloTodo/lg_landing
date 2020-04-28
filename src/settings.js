import {apiSettings} from "./react-utils/settings";

export const settings = {
    ...apiSettings,
    country: 1,
    currency: apiSettings.endpoint + 'currencies/1/',
    categoryFilters: {
        "Cell": [
            {
                name: "Serie",
                options: ["Serie K", "Serie G", "Serie Q"],
                type: "exact",
                source: "customFields",
                source_key: "serie"
            },
            {
                name: "Tipo de pantalla",
                options: ["HD", "Full HD"],
                type: "exact",
                source: "customFields",
                source_key: "screen_type"
            },
            {
                name: "Batería",
                options: ["3000 MAH", "3500 MAH", "4000 MAH"],
                type: "range",
                range_data: {
                    "3000 MAH": [3000, 3499],
                    "3500 MAH": [3500, 3999],
                    "4000 MAH": [4000, 99999]
                },
                source: "specs",
                source_key: "battery_mah"
            }
        ]
    },

    orderOptions: [
        {   name: "recommended",
            display: "RECOMENDADO",
            sortFunction: (a,b) => {console.log("recomendado"); return 0}
        },
        {   name: "highToLow",
            display: "PRECIO DE MAYOR A MENOR",
            sortFunction: (a, b) => {console.log("mayor a menor"); return 0}
        },
        {   name: "lowToHigh",
            display: "PRECIO DE MENOR A MAYOR",
            sortFunction: (a, b) => {console.log("menor a mayor"); return 0}
        },

    ],

    banners: [
        {
            src: "/banners/slide-1.png",
            url: "/celulares?product=63424"
        },
        {
            src: "/banners/slide-2.png",
            url: "/televisores"
        },
        {
            src: "/banners/slide-3.png",
            url: "/"
        }
    ]

}