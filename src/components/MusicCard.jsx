import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
  }

  componentDidMount() {
    this.favoriteSong();
  }

  async onClickCheckbox(musicId) {
    const { favorites } = this.state;
    this.setState({ loading: true }, async () => {
      await addSong(musicId);
      this.setState({
        loading: false,
        favorites: [...favorites, musicId],
      });
    });
  }

  favoriteSong = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { musics } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <ul>
            {musics.map((music) => {
              const { trackId, trackName, previewUrl } = music;
              return (
                <li key={ trackId }>
                  <p>{ trackName }</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  <label htmlFor="favorite">
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      onChange={ () => this.onClickCheckbox(music) }
                      checked={ favorites.some((song) => song.trackId === trackId) }
                      type="checkbox"
                      id="favorite"
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
export default MusicCard;
