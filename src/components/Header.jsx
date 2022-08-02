import React from 'react';
import { getUser } from '../services/userAPI';
import LoadingScreen from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: {},
    };

    this.userProfile = this.userProfile.bind(this);
  }

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    this.setState({ loading: true }, async () => {
      this.setState({
        loading: false,
        name: await getUser(),
      });
    });
  }

  render() {
    const { name } = this.state;
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <LoadingScreen />
        ) : (
          <div>
            <p data-testid="header-user-name">
              {name.name}
            </p>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
