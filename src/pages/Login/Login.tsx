import { Link } from 'react-router-dom';

function Login() {
  return (
    <main>
      <form>
        <input type="text" data-testid="email-input" name="emailUser" />
        <input type="text" name="password" data-testid="password-input" />
        <input type="text" />
        <div>
          Login
          <button data-testid="login-submit-btn">
            Enter
            <Link to="/meals" />
          </button>
        </div>
      </form>
    </main>
  );
}
export default Login;
