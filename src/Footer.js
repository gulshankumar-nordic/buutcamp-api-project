import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <footer>
                    <div className="footer-copyright text-center">© 2018 Copyright - 
                        <a href="http://www.netwink.fi">Gulshan Kumar</a>
                    </div>
                </footer>
            </div>
         );
    }
}
 
export default Footer;