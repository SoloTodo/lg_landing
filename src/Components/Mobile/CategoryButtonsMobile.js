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
        let selectedItem = null;

        for (const idx in navigation.items) {
            if (navigation.items[idx].url === pathname) {
                selectedItem = navigation.items[idx]
            }
        }

        const items = navigation.items.filter(item => {
            return item.button
        })

        return <div className="d-flex justify-content-center mt-2 mb-3">
            <UncontrolledButtonDropdown>
                <DropdownToggle caret className="slider-button">
                    {selectedItem.button_name}
                </DropdownToggle>
                <DropdownMenu>
                    {items.map(item => {
                        return <CategoryLink key={item.button_name} to={item.url} className="dropdown-item" >
                            {item.button_name}
                        </CategoryLink>
                    })}
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>

        // return <Slider {...sliderSettings} className="slider-buttons">
        //     {
        //         items.map(item => {
        //             const isSelected = item.url === pathname;
        //             return <CategoryLink to={item.url} key={item.url} className={classNames('slider-button d-flex justify-content-center align-items-center', {selected:isSelected})}>
        //                 {item.button_name}
        //             </CategoryLink>
        //         })
        //     }
        // </Slider>
    }
}


export default withRouter(CategoryButtonsMobile);