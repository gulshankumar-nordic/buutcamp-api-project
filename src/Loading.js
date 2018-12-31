import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import {getUser} from './actions/userAction';
import { getKohdet } from './actions/kohdeAction';

class Loading extends Component {
    state = {  }

    componentWillMount(){
        const { userLoading, kohdeLoading } = this.props;
        if (userLoading === undefined) {
            this.props.getUser();
        }
        if( kohdeLoading === undefined ) {
            this.props.getKohdet();
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.kohdeLoading === -1 && nextProps.user !== null ) {
            this.props.getKohdet()
        }
    }
    render() { 
        const  { userLoading, kohdeLoading, children } = this.props;
        if ((!userLoading && !kohdeLoading) || this.props.user === null ) {
            return <div>{children}</div>
        }
        else {
            return <div><h3 style={{color:'green'}}>Loading...</h3></div>
        }
      
    }
}

function mapStateToProps(state){
    return {
        userLoading: state.loading.user,
        kohdeLoading: state.loading.kohdet,
        user: state.user
    }
}
 
export default withRouter(connect(mapStateToProps, {getKohdet, getUser})(Loading));