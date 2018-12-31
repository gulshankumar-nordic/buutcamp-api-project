import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { updateKohde } from './actions/kohdeAction';
import { Link } from 'react-router-dom';

const provider = new OpenStreetMapProvider();

class LocationUpdate extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name:this.props.kohde.name,
        address:this.props.kohde.address,
        setLongitude:this.props.kohde.setLongitude,
        setLatitude:this.props.kohde.setLatitude,    
      };
  
      this.onNameChange = this.onNameChange.bind(this);
      this.onAddressChange = this.onAddressChange.bind(this);
      this.onValueSubmit = this.onValueSubmit.bind(this);
    }
  
  
    /* componentDidMount(){
      this.props.getKohdet();
      this.props.getUser()
      this.setState({kohdet: this.renderKohdet()
      })
    } */
  
       
    onNameChange(e){ 
      this.setState({name: e.target.value});
    }
  
    onAddressChange(e){
      if(e.target.value.length >0 ){
      this.setState({address: e.target.value});
       provider.search({ query: e.target.value })
       .then(res => {
         if(res.length>0) {
          this.setState({
            setLongitude: res[0].x,
            setLatitude: res[0].y
          })
         }
       })
      } 
    }
  
    onValueSubmit(e){
      e.preventDefault();
      const kohde = {
        name: this.state.name,
        address: this.state.address,
        setLatitude:this.state.setLatitude,
        setLongitude: this.state.setLongitude,
        //uid: this.props.user.uid
      }
  
      //database.push(kohde);
      this.props.updateKohde(this.props.match.params.id, kohde);
      this.setState({
        name:'',
        address:'',
        //uid: this.props.user.uid
      })
      this.props.history.push('/')
    }
  
    render() {
      return (
        <div className="main-page" >
          <Container>
              <br/>
           <Row>
            <Col xs="6">
              <div>
                <form 
                onSubmit={this.onValueSubmit}>
                 <div className="form-group">
                    <label>Enter name </label>
                  <input 
                  className="form-control" 
                  type="text" 
                  name="name"
                  value={this.state.name}
                  onChange={this.onNameChange}
                  />
                  </div>
                  <div className="form-group">
                    <label>Address </label>
                    <input 
                    className="form-control" 
                    type="text"
                    name="address"
                    value={this.state.address}
                    onChange={this.onAddressChange}
                    />
                  </div>
                  <input type="hidden" name="longtitude" value={this.state.setLongitude.substring(0, 7)}/>
                 <input type="hidden" name="latitude" value={this.state.setLatitude.substring(0, 7)}/>
                 <div className="form-group">
                 <input type="submit" style={{width:'45%'}}  className="btn btn-primary"  value="Save"/>
                 <input type="submit" style={{width:'45%', marginLeft:'10%'}}  className="btn btn-danger"  value="Cancel"/>
                 </div>
                </form>
                <Link to="/">Back</Link>
              </div>
            </Col>
            <Col xs="6">
              <div style={{textAlign:"center"}}>
              <p>{this.state.setLongitude.substring(0, 7)} - Longitude</p>
                <p>{this.state.setLatitude.substring(0, 7)} - Latitude</p>
               
              </div>
            </Col>
          </Row>
      
          </Container>
        </div>
      );
    };
  }
  
 
function mapStateToProps(state, ownProps){
    return {
        kohde: state.kohdet[ownProps.match.params.id],
        uid: state.user.uid
    }
}
export default connect(mapStateToProps, {updateKohde})(LocationUpdate);