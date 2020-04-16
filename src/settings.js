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
                source: "customFields"
            },
            {
                name: "Tipo de pantalla",
                options: ["HD", "Full HD"],
                source: "customFields"
            },
            {
                name: "Batería",
                options: ["3000 MAH", "3500 MAH", "4000 MAH"],
                source: "specs"
            }
        ]
    }
}