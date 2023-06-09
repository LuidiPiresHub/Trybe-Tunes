import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingScreen from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: {},
    };
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
      <div>
        <header data-testid="header-component">
          <div>
            <div className="headerConteiner">
              <img className="headerLogo" src="https://www.abcdacomunicacao.com.br/wp-content/uploads/Trybe_logo-baixa.png" alt="Trybe Tunes Logo" />
              { loading ? <LoadingScreen /> : (
                <p className="headerName" data-testid="header-user-name">{name.name}</p>
              )}
            </div>
            <nav className="linksConteiner">
              <Link
                className="links"
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
              <Link
                className="links"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
              <Link
                className="links"
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
