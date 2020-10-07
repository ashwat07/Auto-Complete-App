import React, { Component } from 'react';


class SearchBar extends Component {

  render() {
    return(
      <div>
        <h2 className="App-header">Creating a simple auto-complete app.</h2>
        <input type="text" className="search" />
      </div>
    )
  }
}
export default SearchBar;
