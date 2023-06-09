import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabledButton: true,
      albuns: [],
      render: false,
      artist: '',
      loading: false,
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

  searchButton = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true, name: '' }, async () => {
      const musics = await searchAlbumsAPI(name);
      if (musics.length !== 0) {
        this.setState({
          loading: false,
          albuns: musics,
          render: 'enable',
          artist: name,
        });
      } else {
        this.setState({ loading: false, render: 'fail' });
      }
    });
  }

  renderMusicList = () => {
    const { albuns } = this.state;
    return albuns.map((album) => (
      <div key={ album.collectionId }>
        <div>
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            <img
              className="searchImgConteiner"
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
            />
          </Link>
          <div className="subAlbumConteiner">
            <p className="albumName">{ album.collectionName }</p>
            <p className="albumArtist">{ `Artista ${album.artistName}` }</p>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { isDisabledButton, render, artist, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {!loading ? (
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
              onClick={ this.searchButton }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        ) : (
          <div>
            <LoadingScreen />
          </div>
        )}

        <div className="albumNotFound">
          { render === 'fail' && (<h1>Nenhum álbum foi encontrado</h1>)}
        </div>

        { render === 'enable' && (
          <h2 className="albumTitle">{`Resultado de álbuns de: ${artist}`}</h2>
        )}

        <div className="albumConteiner">
          { render === 'enable' && (this.renderMusicList()) }
        </div>
      </div>
    );
  }
}

export default Search;
