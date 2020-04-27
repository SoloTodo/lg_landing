import {apiSettings} from "./react-utils/settings";

export const settings = {
    ...apiSettings,
    country: 1,
    currency: apiSettings.endpoint + 'currencies/1/',
    categoryFilters: {
        "Cell": [
            {
                name: "Serie",
                options: ["Serie K", "Serie G"],
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

    banners: [
        {
            src: "/banners/slide-1.png",
            url: "/"
        },
        {
            src: "/banners/slide-2.png",
            url: "/"
        },
        {
            src: "/banners/slide-3.png",
            url: "/"
        }
    ]

}