import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import './style/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout} from './actions/userAction';
import './App.css';
class Navigation extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
        return ( 
            <div>
                <Container>
          <Row>
            <Col xs="12">
            <div>
              <nav className="navbar navbar-expand-sm justify-content-between">
              <Link to="/home"><h1 style={{color:'gray'}}>Kartalle</h1></Link>
                <ul className="navbar-nav">
                  <li className="nav-item">
                  <Link to="/home" className="link-props">Home</Link>
                  </li>
                  {
                    this.props.user === null ? (
                    <span></span>
                    ) : (
                        <li className="nav-item">
                        <Link to="/" className="link-props" >Location</Link>
                        </li>
                    )
                  }
                   {
                    this.props.user === null ? (
                      <li className="nav-item">
                        <Link to="/login" className="link-props">Login</Link>
                      </li>
                    ) : (
                        <li className="nav-item">
                        <Link to="/logout" className="link-props" onClick={() => this.props.logout()}>Logout</Link>
                        </li>
                    )
                  }
  
                </ul>
              </nav>
              </div>
            </Col>
          </Row>
        </Container>
            </div>
         );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}
 
export default connect(mapStateToProps, {getUser, logout})(Navigation);