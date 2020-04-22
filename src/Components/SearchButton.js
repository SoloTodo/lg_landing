import React from 'react'
import {Button} from "reactstrap";
import Input from "reactstrap/es/Input";
import {Link} from 'react-router-dom'

import { SearchWhiteSvg } from '../Icons';


class SearchButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            keyword: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.searchInput) {
            this.searchInput.focus();
        }
    }

    toggleSearchBar = () => {
        if (this.state.keyword) {
            return
        }

        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    updateKeyword = (e) => {
        const value = e.target.value;
        this.setState({
            keyword: value
        })
    }

    render() {
        const Icon = this.props.icon;
        const buttonClass = this.state.keyword? "header-search-button active d-flex justify-content-end":"header-search-button d-flex justify-content-end"
        return <div className={buttonClass}>
            { this.state.isOpen? <div className="d-flex align-items-center">
                    <Input className="header-search-input" innerRef={(input) => this.searchInput = input} onChange={this.updateKeyword} onBlur={this.toggleSearchBar}/>
                    <Link to={`/search?keyword=${this.state.keyword}`}><Button className="header-button-input" color="link"><SearchWhiteSvg/></Button></Link>
                </div>:
                <Button className="header-button" color="link" onClick={this.toggleSearchBar}>
                    <Icon/>
                </Button>
            }
        </div>
    }
}

export default SearchButton;