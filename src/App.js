import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameState: [],
      id: 1,
      multiple: false,
      status: ''
    }
  }

   addNames(e) {
     e.preventDefault();
     var name = this.name.value;
     this.setState({id: this.state.id+1})
     fetch(`http://localhost:4000/names/add?id=${this.state.id}&name=${name}`)
      .then(window.location.reload())
      .catch(err => console.log(err));

  }

  componentDidMount() {
      fetch(`http://localhost:4000/names`)
       .then(response => response.json())
       .then(response => this.setState({nameState: response.data}))
       .catch(err => console.error(err))
  }

  render() {
    const { nameState, multiple } = this.state;
    var options = nameState.map(item => {
      return item.name;
    })

    return (
      <div className="App">
        <h3>Simple Autocomplete App</h3>
        <input type="text" id="text" ref={(node)=>this.name=node} required />
        <Button bsStyle="primary" bsSize="small" onClick={(e)=>this.addNames(e)} >Add</Button><br/><br/>
        <Fragment>
        <AsyncTypeahead
          labelKey="name"
          onSearch={false}
          multiple={multiple}
          options={
            options
          }
          placeholder="Search name..."
        />

        </Fragment>
      </div>
    );
  }
}

export default App;
