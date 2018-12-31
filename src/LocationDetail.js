import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmitReview from './SubmitReview';
import _ from 'lodash';
import Review from './Review';
import { Container, Row, Col } from 'reactstrap';
class LocationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    renderReview(){
        const {  kohde} = this.props;
        console.log(this.props)
        return _.map(kohde.review, (reviews, key) => {
            return (
                <li key={key} className="list-group-item">
                    <Review key={key} id={key}>
                        {reviews.review}
                    </Review>
                </li>
            )
            
        })
    }
    render() { 
        const  { kohde } = this.props;
        return ( 
            <div className="main-page" >
            <Container>
            <Row>
             <Col xs="12">
            <div style={{paddingTop:50}}>
                <h1>{kohde.name}</h1>
                <h5>{kohde.address}</h5>
                <SubmitReview id={this.props.match.params.id}/>

                <ul className="list-group list-group-flush">
                    {this.renderReview()}
                </ul>
                
                <Link to="/">Back</Link>
            </div>

            </Col>
            </Row>
            </Container>
            </div>
         );
    }
}
 
function mapStateToProps(state, ownProps){
    console.log('this is kohde '+ state.kohdet)
    return {
        kohde: state.kohdet[ownProps.match.params.id],
        uid: state.user.uid
    }
}
export default connect(mapStateToProps)(LocationDetail);