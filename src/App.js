import React, { Component } from 'react';
import './App.css';
import './style/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';
import 'ol/ol.css';
import _ from 'lodash';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { connect } from 'react-redux';
import { getLocations, getKohdet, saveKohde, deleteKohde } from './actions/kohdeAction';
//import 'leaflet/dist/leaflet.css'
import {Link} from 'react-router-dom';
import LocationCard from './LocationCard';
import { getUser } from './actions/userAction'
import Main from './Main';
const provider = new OpenStreetMapProvider();

class App extends Component {

  state = {
    markers: []
  };
  constructor(props) {
    super(props);

   
    this.state = {
      collapsed: true,
      name:'',
      address:'',
      zoomOffset: 1,
      hasLocation: false,
      setLongitude:'',
      setLatitude:'',    
      test:[] ,
      markers: {},
      allMarkers: [],
      lat: 65.021,
      lng: 25.469,
      zoom: 13,
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


  renderKohdet(){
    return _.map(this.props.kohdet, (value, key) => {
      return (
       <LocationCard key={key} >
        <Link to={`/${key}`}>
          <h3>{value.name}</h3>
        </Link>
          <p>{value.address} - {value.setLongitude} - {value.setLatitude }</p>
          {value.uid === this.props.user.uid && (
            <div >
            <button className="btn btn-danger" style={{width:'45%'}} onClick={()=>this.props.deleteKohde(key)}>delete</button>
            <button className="btn btn-outline-info" style={{marginLeft:'10%', width:'45%'}}>
            <Link to={`/${key}/update`}>Update</Link>
            </button>
           
            </div>
          )}
        </LocationCard>
      
      );
    });
  }

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
      uid: this.props.user.uid
    }

    //database.push(kohde);
    this.props.saveKohde(kohde);
    this.setState({
      name:'',
      address:'',
      uid: this.props.user.uid
    })
  }
  render() {
    if(this.props.user === null ){
      return (
        <Main/>
      )
      
    } else  {
    return (
      <div className="main-page" >
 
        <Container className="main-page">
         <Row>
          <Col xs="5">
            <div >
          
              <hr/>
              <form onSubmit={this.onValueSubmit}>
              <div className="form-group">
                    <label>Name</label>
                <input 
                className="form-control"
                type="text" 
                name="name"
                value={this.state.name}
                onChange={this.onNameChange}
                />
                </div>
                <div className="form-group">
                    <label>Address</label>
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
               <input className="form-control" type="submit" value="Save"/>
              </form>
              <br/>
              <p>{this.state.setLongitude.substring(0, 7)} - Longitude</p>
              <p>{this.state.setLatitude.substring(0, 7)} - Latitude</p>
            
            </div>
          </Col>
          <Col xs="7">
            <div>
            {this.renderKohdet()}
            </div>
          </Col>
        </Row>
        
        </Container>
      </div>
    );
    }
  };
}

const mapStateToProps = (state,ownProps) => {
  return {
    kohdet: state.kohdet,
    user: state.user
  }
};


export default connect(mapStateToProps,{getKohdet, saveKohde, deleteKohde, getLocations, getUser})(App);
