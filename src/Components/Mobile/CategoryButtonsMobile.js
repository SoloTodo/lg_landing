import React from "react";
import { withRouter } from "react-router-dom";
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import CategoryLink from "../CategoryLink";
import navigation from "../../Layout/_nav";


class CategoryButtonsMobile extends React.Component {
    render() {
        const pathname = this.props.location.pathname;
        let selectedItem = navigation.items[0];

        for (const item of navigation.items) {
            if (item.url === pathname) {
                selectedItem = item
            }
        }

        const dropdownLabel = selectedItem.url === '/' ? 'VER CATEGORIAS' : selectedItem.button_name

        const items = navigation.items.filter(item => {
            return item.button
        })

        return <div className="d-flex justify-content-center mt-2 mb-3">
            <UncontrolledButtonDropdown>
                <DropdownToggle caret className="slider-button">
                    {dropdownLabel}
                </DropdownToggle>
                <DropdownMenu className="mobile-category-menu">
                    {items.map(item => {
                        return <CategoryLink key={item.url} to={item.url} className="dropdown-item mobile-category-option d-flex justify-content-center" >
                            {item.button_name}
                        </CategoryLink>
                    })}
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    }
}


export default withRouter(CategoryButtonsMobile);