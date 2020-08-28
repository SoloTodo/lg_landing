import React from 'react'
import image from './PromotorVirtual.png'

class PromotorVirtual extends React.Component {
    componentDidMount() {
        window.LiveChatWidget.call('hide');
    }

    handleClick = evt => {
        evt.preventDefault()

        document.getElementById('chat-widget').style.visibility = 'visible';
        document.getElementById('promotor_lg_mobile').style.visibility = 'hidden';
        window.LC_API.open_chat_window();
    }

    render() {
        return <div id="promotor_lg_mobile">
            <a href="#" onClick={this.handleClick}>
                <img width="100" height="85" src={image} alt="Promotor LG" />
            </a>
        </div>
    }
}

export default PromotorVirtual