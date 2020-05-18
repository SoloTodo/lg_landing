import React from "react"

import DesktopFilterButtons from "./Desktop/DesktopFilterAndOrderButtons";
import MobileFilterAndOrderButtons from "./Mobile/MobileFilterAndOrderButtons";
import { isMobile } from "../utils";


class FilterAndOrderButtons extends React.Component {
    render() {
        const filterCallbacks = {
            toggleOrderModalOpen:this.props.toggleOrderModalOpen,
            toggleFilterModalOpen:this.props.toggleFilterModalOpen
        }
        return isMobile()?
            <MobileFilterAndOrderButtons {...filterCallbacks}/>:
            <DesktopFilterButtons {...filterCallbacks}/>
    }
}

export default FilterAndOrderButtons