import React, { Component } from 'react';
import './App.css';
import { database } from './firebase';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      address:'',
      kohdet:{}
      }
      this.onValueChange = this.onValueChange.bind(this);
      this.onSaveSubmit = this.onSaveSubmit.bind(this);
      this.renderKohde = this.renderKohde.bind(this)
  }

  componentDidMount(){
    database.on('value', snapshot => {
      this.setState({
        kohdet: snapshot.val()
      });
    })

  }

  onValueChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onSaveSubmit(e){
    e.preventDefault();
    console.log("submkit press");
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
  renderKohde(){
    return _.map(this.state.kohdet,(kohde, key) => {
      return (
        <div key="key">
          <h3>{kohde.name}</h3>
          <p>{kohde.address}</p>
        </div>
      )
    });
  }
  render() { 
    return ( 
      <div>

        <form onSubmit={this.onSaveSubmit}>
        Name:<br />
        <input type="text"
        onChange={this.onValueChange}
        value={this.state.name}
        name="name" /><br />
        Address:<br />
        <input type="text" 
        onChange={this.onValueChange}
        value={this.state.address}
        name="address" />
         <input type="submit" value="Submit"></input>
        </form>
        {this.renderKohde()}
      </div>
     );
  }
}
 
export default App;