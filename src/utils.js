import {settings} from "./settings"
import {formatCurrency} from "./react-utils/utils";

export function lgStateToPropsUtils(state) {
    const preferredCurrency = state.apiResourceObjects[settings.currency] || null;

    return {
        preferredCurrency,
        formatCurrency: (value, currency = null, convertToPreferredCurrency = false) => {
            if (!currency) {
                currency = preferredCurrency
            }
            return formatCurrency(value, currency,convertToPreferredCurrency ? preferredCurrency : null, '.')
        }
    }
}

export function isMobile() {
    return window.innerWidth < 700;
}