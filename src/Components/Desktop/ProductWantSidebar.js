import React from "react";
import { connect } from "react-redux";
import { slide as Menu} from "react-burger-menu";

import ProductModalCommon from "../Mobile/ProductModalCommon";
import {ArrowLeftSvg, CloseModalSvg} from "../../Icons";
import { lgStateToPropsUtils } from "../../utils";
import {Button, Card, CardBody} from "reactstrap";
import ProductGallery from "../ProductGallery";


class ProductWantSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            galleryOpen: false
        }
    }

    toggleGallery = () => {
        this.setState({
            galleryOpen: !this.state.galleryOpen
        })
    }

    closeSidebar = () => {
        this.setState({
            galleryOpen: false
        })
        this.props.toggle();
    }

    isMenuOpen = (state) => {
        if (this.props.isOpen !== state.isOpen){
            this.closeSidebar();
        }
    };

    render() {
        let productEntry = null;
        if (this.props.productId) {
            productEntry = this.props.productEntries.filter(productEntry => {
                return productEntry.product.id === this.props.productId
            })[0]
        } else {
            return null
        }

        const product = productEntry.product;
        const lgData = productEntry.customFields;
        const content = this.state.galleryOpen?
            <div className="gallery-modal">
                <Card className="gallery-modal-card">
                    <CardBody>
                        <div className="gallery-modal-button"><Button onClick={this.toggleGallery}><ArrowLeftSvg/> <span className="pl-2">Volver atrás</span></Button></div>
                        <ProductGallery productEntry={productEntry}/>
                    </CardBody>
                </Card>
            </div>:
            <div className="product-modal">
                <div className="d-flex flex-column">
                    <span className="product-modal-sku"><span>SKU</span>: {lgData.lgSku}</span>
                    <span className="product-modal-name flex-fill">{lgData.customTitle}</span>
                </div>
                <div className="d-flex align-content-between pt-4">
                    <div className="d-flex align-items-center product-modal-image"><img alt={product.name} src={product.picture_url} onClick={this.toggleGallery}/></div>
                    <div className="d-flex flex-column product-modal-text">
                        <span className="product-modal-description">{lgData.customDescription}.</span>
                    </div>
                </div>
                <ProductModalCommon productEntry={productEntry}/>
            </div>

        return <Menu isOpen={ this.props.isOpen } right className="product-sidebar" onStateChange={this.isMenuOpen}>
            <div className="d-flex align-items-center product-sidebar-header">
                <div className="d-flex align-items-center flex-fill justify-content-between">
                    <span>Estás viendo</span>
                    <span onClick={this.closeSidebar}><CloseModalSvg/></span>
                </div>
            </div>
            { content }
        </Menu>
    }
}

function mapStateToProps(state) {
    const {formatCurrency} = lgStateToPropsUtils(state);

    return {
        productEntries: state.productEntries,
        formatCurrency,
    }
}

export default connect(mapStateToProps)(ProductWantSidebar);