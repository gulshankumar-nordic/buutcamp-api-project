import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { saveReview } from './actions/kohdeAction';
class SubmitReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            review: ''
         }
         this.onReviewValueChange=this.onReviewValueChange.bind(this)
         this.onValueSubmit=this.onValueSubmit.bind(this);
    }

    onValueSubmit(e){
        e.preventDefault();
        const review = {
            review: this.state.review,
            uid: this.props.uid
        }
        this.props.saveReview(this.props.id, review);
        this.setState({ 
            review:''
        })
    }

    onReviewValueChange(e){
        this.setState({
            review: e.target.value
        })
    }

    render() { 
        return (
            <Container>
            <Row>
            <Col xs="12" style={{paddingLeft:0}}>
            <div >
                <form
                  
                  onSubmit={this.onValueSubmit}>
                   <div className="form-group">
                    <label>Review</label>
                    <textarea 
                    className="form-control"
                    type="text" 
                    name="review"
                    placeholder="Write your review ...."
                    value={this.state.review}
                    onChange={this.onReviewValueChange}
                    />
                    </div>
                    <div className="form-group">
                    
                    <input className="form-control btn-primary"
                     type="submit" value="Add Review"/>
                    </div>
                </form>
            </div>
            </Col>
            </Row>
            </Container>
          );
    }
}
 
function mapStateToProps(state, ownProps) {
    return {
        uid: state.user.uid
    }
}
export default connect(mapStateToProps, {saveReview})(SubmitReview);