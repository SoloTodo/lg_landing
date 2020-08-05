import React from "react";
import { withRouter } from "react-router-dom";
import { isMobile } from "../utils";
import CategoryButtonsMobile from "./Mobile/CategoryButtonsMobile";
import CategoryButtonsDesktop from "./Desktop/CategoryButtonsDesktop";


class LgCategoryButtons extends React.Component {
    render() {
        return isMobile()?
            <CategoryButtonsMobile/>:
            <CategoryButtonsDesktop/>
    }
}


export default withRouter(LgCategoryButtons);