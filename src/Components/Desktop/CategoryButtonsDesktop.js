import React from "react";
import { withRouter } from "react-router-dom";

import navigation from "../../Layout/_nav";


class CategoryButtonsDesktop extends React.Component {
    render() {
        const pathname = this.props.location.pathname;
        let initialSlide = 0;

        for (const idx in navigation.items) {
            if (navigation.items[idx].url === pathname) {
                initialSlide = idx;
            }
        }

        const items = navigation.items.filter(item => {
            return item.button
        })

        return <div>Category Buttons Desktop Placeholder</div>
    }
}


export default withRouter(CategoryButtonsDesktop);