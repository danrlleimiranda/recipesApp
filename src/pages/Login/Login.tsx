import { Link } from 'react-router-dom';

function Login() {
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      } }
    >
      Login
      <Link to="/meals">Entrar</Link>
    </div>
  );
}
export default Login;
