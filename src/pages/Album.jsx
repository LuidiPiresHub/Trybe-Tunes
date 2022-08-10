import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { MusicCard } from '../components/MusicCard';
import LoadingScreen from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.renderMusicList();
  }

  renderMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({ musicList, loading: false });
  }

  render() {
    const { musicList, loading } = this.state;
    const musics = musicList.filter((music) => music.kind === 'song');
    const allMusics = musics.map((music, index) => {
      const { trackName, previewUrl } = music;
      return (
        <MusicCard key={ index } trackName={ trackName } previewUrl={ previewUrl } />
      );
    });

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (
          <LoadingScreen />
        ) : (
          <div className="albumPageConteiner">

            <div className="albumInfos">
              <img
                src={ musicList[0].artworkUrl100 }
                alt={ musicList[0].collectionName }
              />
              <p data-testid="album-name">{ musicList[0].collectionName }</p>
              <p data-testid="artist-name">{musicList[0].artistName}</p>
            </div>

            <ul className="musicsConteiner">{allMusics}</ul>

          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
