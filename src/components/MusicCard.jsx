import React from 'react';
import propTypes from 'prop-types';

export class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <li className="musicList">

        <div className="musicListName">
          <p>{ trackName }</p>
        </div>

        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>

      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};

export default MusicCard;
