import React from 'react'
import { Button, Input } from "reactstrap";
import { withRouter } from 'react-router-dom'
import classNames from "classnames"

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

    performSearch = () => {
        this.props.history.push(`/search?keyword=${this.state.keyword}`);
    }

    keyPerformSearch = (e) => {
        if (e.key === 'Enter') {
            this.performSearch();
            if (this.props.callback) {
                this.props.callback();
            }
        }
    }

    render() {
        const Icon = this.props.icon;
        return  this.state.isOpen? <div className={classNames("header-search-input-container d-flex justify-content-end", {active:this.state.keyword})}>
                <div className="d-flex align-items-center">
                    <Input className="header-search-input" innerRef={(input) => this.searchInput = input} onChange={this.updateKeyword} onBlur={this.toggleSearchBar} onKeyPress={this.keyPerformSearch}/>
                    <Button className="header-button-input" color="link" onClick={this.performSearch}><SearchWhiteSvg/></Button>
                </div>
            </div>:
            <div className={classNames("header-search-button-container d-flex")}>
                <Button className="header-button" color="link" onClick={this.toggleSearchBar}>
                    <Icon/>
                </Button>
            </div>
    }
}

export default withRouter(SearchButton);