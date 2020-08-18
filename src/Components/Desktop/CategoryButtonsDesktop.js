import React from "react";
import { withRouter } from "react-router-dom";
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap"
import classNames from "classnames"

import navigation from "../../Layout/_nav";
import CategoryLink from "../CategoryLink";


class CategoryButtonsDesktop extends React.Component {
    render() {
        const pathname = this.props.location.pathname;
        let selectedButton = navigation.items[0].name;

        for (const idx in navigation.items) {
            if (navigation.items[idx].url === pathname) {
                selectedButton = navigation.items[idx].name;
            }
        }

        const items = navigation.items.filter(item => {
            return item.button
        })

        const categoriesData = {}

        for (const item of items) {
            if (!item.button_parent_name) {
                categoriesData[item.button_name] = {
                    type: 'button',
                    item: item
                }
            }else{
                if (Object.keys(categoriesData).includes(item.button_parent_name)) {
                    categoriesData[item.button_parent_name].items.push(item)
                } else {
                    categoriesData[item.button_parent_name] = {
                        type: 'dropdown',
                        items: [item]
                    }
                }
            }
        }

        return <div className="d-flex justify-content-between ml-5 mr-5 mt-5 mb-5">
            {
                Object.entries(categoriesData).map(categoryData => {
                    const button_name = categoryData[0];
                    const data = categoryData[1];
                    if (data.type==='button') {
                        const item = data.item;
                        const isSelected = item.name === selectedButton
                        return <CategoryLink
                            to={item.url}
                            className={classNames('desktop-category-button d-flex justify-content-center align-items-center', {selected:isSelected})}
                            key={item.button_name}>
                            {button_name}
                        </CategoryLink>
                    } else {
                        const items = data.items;
                        let isSelected = false;
                        for (const item of items) {
                            if (item.name === selectedButton) {
                                isSelected = true;
                            }
                        }

                        return <UncontrolledButtonDropdown key={categoryData}>
                            <DropdownToggle caret className={classNames('desktop-category-button d-flex justify-content-center align-items-center', {selected:isSelected})}>
                                {button_name}
                            </DropdownToggle>
                            <DropdownMenu className="desktop-category-menu">
                                {items.map(item => {
                                    return <CategoryLink key={item.button_name} to={item.url} className="dropdown-item desktop-category-option d-flex justify-content-center">{item.button_name}</CategoryLink>
                                })}
                        </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    }
                })
            }
        </div>
    }
}


export default withRouter(CategoryButtonsDesktop);