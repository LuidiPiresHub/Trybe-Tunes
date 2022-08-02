import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabledButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkInputLength);
  }

  checkInputLength = () => {
    const { name } = this.state;
    this.setState({ isDisabledButton: name.length < 2 });
  }

  render() {
    const { isDisabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="formConteiner">
          <input
            className="searchInput"
            type="text"
            name="name"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            className="searchButton"
            type="button"
            disabled={ isDisabledButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
