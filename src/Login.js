import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleSignin} from './actions/userAction';
import { Container, Row, Col } from 'reactstrap';

class Login extends Component {
    componentWillMount(){
        if(this.props.user !== null){
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user !== null) {
            nextProps.history.push('/')
        }
    }

    render() { 
        return (
            <div className="main-page" >
            <Container>
                <Row>
                    <Col xs="12" style={{textAlign:'center', marginTop:100}}>
                    <button onClick={this.props.googleSignin} type="button" className="btn btn-primary">
                            Login with Google
                    
                    </button>
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
 

export default connect(mapStateToProps, { googleSignin})(Login);