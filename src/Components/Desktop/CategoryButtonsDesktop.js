import React from "react";
import { withRouter } from "react-router-dom";
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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

        const singleItems = items.filter(item =>
            !item.button_parent_name
        )

        const multiItems = items.filter(item => item.button_parent_name)
        const groupedMultiItems = {}

        for (const item of multiItems) {
            if (!groupedMultiItems[item.button_parent_name]){
                groupedMultiItems[item.button_parent_name] = []
            }
            groupedMultiItems[item.button_parent_name].push(item)
        }


        return <div className="d-flex justify-content-between ml-5 mr-5 mt-5 mb-5">
            {
                singleItems.map(item => {
                    const isSelected = item.name === selectedButton
                    return <CategoryLink
                        to={item.url}
                        className={classNames('desktop-category-button d-flex justify-content-center align-items-center', {selected:isSelected})} key={item.button_name}>
                        {item.button_name}
                    </CategoryLink>
                })
            }
            {
                Object.entries(groupedMultiItems).map(itemList => {
                    let isSelected = false
                    for (const item of itemList[1]) {
                        if (item.name === selectedButton) {
                            isSelected = true;
                        }
                    }
                    return <UncontrolledButtonDropdown key={itemList[0]}>
                        <DropdownToggle caret className={classNames('desktop-category-button d-flex justify-content-center align-items-center', {selected:isSelected})}>
                            {itemList[0]}
                        </DropdownToggle>
                        <DropdownMenu>
                        {itemList[1].map(item => {
                            return <DropdownItem key={item.button_name}>
                                <CategoryLink to={item.url}>{item.button_name}</CategoryLink>
                            </DropdownItem>
                        })}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                })
            }
        </div>
    }
}


export default withRouter(CategoryButtonsDesktop);