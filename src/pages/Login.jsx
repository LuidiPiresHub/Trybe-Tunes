import React from 'react';
import { Redirect } from 'react-router-dom';
import '../index.css';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisableLoginButton: true,
      username: '',
      loading: 'false',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton = () => {
    const { username } = this.state;
    const TorF = username.length <= 2;
    this.setState({
      isDisableLoginButton: TorF,
    });
  }

  loginUser = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    this.setState({ loading: 'loading' }, async () => {
      await createUser({ name: username });
      this.setState({ loading: 'finished' });
    });
  };

  render() {
    const { isDisableLoginButton, loading } = this.state;
    return (
      <div data-testid="page-login" className="mainLoginDiv">
        {loading === 'false' ? (
          <div>
            <div className="IMG">
              <img src="https://www.abcdacomunicacao.com.br/wp-content/uploads/Trybe_logo-baixa.png" alt="Trybe Tunes Logo" />
            </div>
            <form className="formDiv">
              <div>
                <input
                  data-testid="login-name-input"
                  type="text"
                  placeholder="Nome"
                  name="username"
                  onChange={ this.onInputChange }
                  className="inputLogin"
                />
              </div>
              <div>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ isDisableLoginButton }
                  onClick={ this.loginUser }
                  className="loginButton"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {loading === 'loading' ? (
              <Loading />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
