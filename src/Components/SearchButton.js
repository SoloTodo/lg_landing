import React from 'react'
import {Button} from "reactstrap";
import Input from "reactstrap/es/Input";

import { SearchWhiteSvg } from '../Icons';


class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.searchInput) {
            console.log(this.searchInput);
            this.searchInput.focus();
        }
    }

    toggleSearchBar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const Icon = this.props.icon;
        return <div className="header-search-button">
            { this.state.isOpen? <div className="d-flex align-items-center">
                    <Input className="header-search-input" innerRef={(input) => this.searchInput = input}/>
                    <Button className="header-button-input" color="link"><SearchWhiteSvg/></Button>
                </div>:
                <Button className="header-button" color="link" onClick={this.toggleSearchBar}>
                    <Icon/>
                </Button>
            }
        </div>
    }
}

export default SearchButton;