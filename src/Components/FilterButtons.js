import React from "react"
import DesktopFilterButtons from "./Desktop/DesktopFilterButtons";
import MobileFilterButtons from "./Mobile/MobileFilterButtons";


class FilterButtons extends React.Component {
    render() {
        const isMobile = window.innerWidth < 700;
        const filterCallbacks = {
            toggleOrderModalOpen:this.props.toggleOrderModalOpen,
            toggleFilterModalOpen:this.props.toggleFilterModalOpen
        }
        return isMobile?
            <MobileFilterButtons {...filterCallbacks}/>:
            <DesktopFilterButtons {...filterCallbacks}/>
    }
}

export default FilterButtons