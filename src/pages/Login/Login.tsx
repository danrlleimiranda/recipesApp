import { useNavigate } from 'react-router-dom';
import useForms from '../../hooks/useForms';
import { isValid, saveLocalStorage } from '../../utils/isValid';

function Login() {
  const { form, handleChange } = useForms({
    emailUser: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isValid(form.emailUser, form.password) === false) {
      saveLocalStorage('email', form.emailUser);
      navigate('/meals');
    }
  };
  return (
    <main>
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="emailUser"
          onChange={ (e) => handleChange(e) }
          value={ form.emailUser }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
          value={ form.password }
        />
        <div>
          <button
            data-testid="login-submit-btn"
            disabled={ isValid(form.email, form.password) }
            onClick={ (e) => handleClick(e) }
          >
            Enter
          </button>
        </div>
      </form>
    </main>
  );
}
export default Login;
