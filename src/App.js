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
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import TileWMS from 'ol/source/TileWMS';
class App extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      data: []
    };
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then( (response) => {
        return response.json() })   
        .then( (json) => {
            this.setState({data: json});
        });

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [ 25.41636,65.06785],
      zoom:19
    })
  }) 

  //https://www.openstreetmap.org/search?query=tervakukkatie%2026%2C%20oulu#map=19/65.06785/25.41636

  /* let map = new Map({
    target: 'map',
    view: new View({
      projection: 'EPSG:3857', //HERE IS THE VIEW PROJECTION
      center: [0, 0],
      zoom: 2
    }),
    layers: [
      new TileLayer({
        source: new TileWMS({
          projection: 'EPSG:4326', //HERE IS THE DATA SOURCE PROJECTION
          url: 'http://demo.boundlessgeo.com/geoserver/wms',
          params: {
            'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
          }
        })
      })
    ]
  });
 */

  }

  



  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    console.log(this.state.data);
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
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
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
          <Col xs="12">
            <div id="map" style={{width:'100vh', height:'100vh'}}>
            </div>
          </Col>
        </Row>
        </Container>
      </div>

       

    );
  }
}

export default App;
