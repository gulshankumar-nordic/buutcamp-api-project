import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import _ from 'lodash';
import './style/bootstrap.min.css'
//import { Container, Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
import { getKohdet, saveKohde, deleteKohde } from './actions/kohdeAction';

class Home extends Component {
    state = {
        markers: []
      };

    constructor(props) {
        super(props);
        this.state = { 
            lat: 65.021,
            lng: 25.469,
            zoom: 13,
         }
    }
    componentDidMount(){
        this.props.getKohdet();
    }

    renderMarker(){
        return _.map(this.props.kohdet, (value, key) => {
          console.log([value.setLatitude, value.setLongitude])
          return (
              <div key={key}>
                  <Marker key={key} position={[value.setLatitude, value.setLongitude]}>
                    <Popup>
                        <h1>{value.name}</h1>
                        <p>{value.address}</p>
                        <Link to={`/${key}`}>Review</Link>
                    
                    </Popup>
                    </Marker>
                </div>
          );
        });
      }

    render() { 
        const position = [this.state.lat, this.state.lng]
        return (  
            <div >
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {this.renderMarker()}
                </Map>
            </div>
        );
    }
}
 
const mapStateToProps = (state,ownProps) => {
   
    return {
      kohdet: state.kohdet,
    }
  };
  
  
  export default connect(mapStateToProps,{getKohdet, saveKohde, deleteKohde})(Home);
  