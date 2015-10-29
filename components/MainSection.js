import React, { Component, PropTypes } from 'react';
import PokemonList from './PokemonList';
import FilterPokemon from './FilterPokemon';
import LuaParse from '../libs/luaparse.js';
import '../semantic/dist/semantic.min.css';

export default class MainSection extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { data : { pokemon, caughtPokemon, searchTerm }, actions } = this.props;

    return (
      <div className="ui attached stackable menu">
          <div className="header item">
              Lua Flow
          </div>
          <div className="ui simple dropdown item">
              File
              <i className="dropdown icon"></i>
              <div className="menu">
                  <a className="item">New</a>
                  <a className="item">Open</a>
                  <a className="item">Settings</a>
                  <a className="item">Exit</a>
              </div>
          </div>
          <div className="ui simple dropdown item">
              Edit
              <i className="dropdown icon"></i>
              <div className="menu">
                  <a className="item">Undo</a>
                  <a className="item">Redo</a>
                  <a className="item">Cut</a>
                  <a className="item">Copy</a>
                  <a className="item">Paste</a>
              </div>
          </div>
          <div className="ui simple dropdown item">
              View
              <i className="dropdown icon"></i>
              <div className="menu">
                  <a className="item">Properties</a>
                  <a className="item">Components</a>
              </div>
          </div>
      </div>
    );
  }

}
