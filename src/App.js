import React, { Component } from 'react';
import './App.css';
import './style/bootstrap.min.css'
import { Container, Row, Col,  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import 'ol/ol.css';

import _ from 'lodash';
import { database } from './firebase';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();
class App extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      data: [],
      name:'',
      address:'',
      kohdet:{},
      zoom: 1,
      zoomOffset: 1,
      hasLocation: false,
      setLongitude:'',
      setLatitude:''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onValueSubmit = this.onValueSubmit.bind(this);
    this.searchFormSubmit = this.searchFormSubmit.bind(this);
  }

  componentDidMount(){
    
      /* const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        zoom:8,
        center: [49.8419, 24.0315],
      })
    })  */

    database.on('value', snapshot => {
      this.setState({ 
        kohdet: snapshot.val(),
       
      });
    });

    let locations = [
      ["LOCATION_1",65.0121, 25.4651],
  
      ["LOCATION_4",62.1763, 25.3532],
  
      ];
          let marker=null;
          let map = L.map('map').setView([65.0121, 25.4651], 8);
          let mapLink = 
              '<a href="http://openstreetmap.org">OpenStreetMap</a>';
          L.tileLayer(
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + mapLink + ' Contributors',
              maxZoom: 18,
              }).addTo(map);
  
      for (let i = 0; i < locations.length; i++) {
        marker = new L.marker([locations[i][1],locations[i][2]])
          //.bindPopup(locations[i][0])
          .addTo(map);
      }

  }

  

  renderKohdet(){
   /*  database.on('value', snapshot => {
      this.setState({ 
        kohdet: snapshot.val(),
       
      });
    }); */
    return _.map(this.state.kohdet, (value, key) => {
      return (
        <div key={key}>
          <h1>{value.name}</h1>
          <p>{value.address}</p>
        </div>

      );
    });
  }

  onNameChange(e){
    this.setState({name: e.target.value});
  }

  onAddressChange(e){
    this.setState({address: e.target.value});
     provider.search({ query: e.target.value })
     .then(res => {
       
       
       this.setState({
        setLongitude: res[0].x,
        setLatitude: res[0].y
      })
     })
     
    //console.log('this is result - ', result);

  }

  onValueSubmit(e){
    e.preventDefault();
    const kohde = {
      name: this.state.name,
      address: this.state.address
    }

    database.push(kohde);
    this.setState({
      name:'',
      address:''
    })

  }

  searchFormSubmit(e){
    e.preventDefault();
    console.log("search button");
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="main-page" >
        <Container>
          <Row>
            <Col xs="12">
              <Navbar  light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        <Container>
         <Row>
          <Col xs="6">
            <div>
           
              <hr/>
              <form onSubmit={this.onValueSubmit}>
                <input 
                type="text" 
                name="name"
                value={this.state.name}
                onChange={this.onNameChange}
                />
                <input 
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.onAddressChange}
                />
               
               <input type="submit" value="Search"/>
              </form>
              <br/>
              <p>{this.state.setLongitude} - Longitude</p>
              <p>{this.state.setLatitude} - Latitude</p>
              <hr />
              {this.renderKohdet()}
            </div>
          </Col>
          <Col xs="6">
            <div>
              <div id='map' style={{width:600, height:400}}></div>
            </div>
          </Col>
        </Row>
      
        </Container>
      </div>

       

    );
  }
}

export default App;
