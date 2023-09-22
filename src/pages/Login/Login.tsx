import { useNavigate } from 'react-router-dom';
import useForms from '../../hooks/useForms';
import { saveLocalStorage } from '../../utils';

function Login() {
  const { form, handleChange } = useForms({
    emailUser: '',
    password: '',
  });

  const isValid = () => {
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    return !!((regexEmail.test(form.emailUser) === false || form.password.length <= 6));
  };

  console.log(form);

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isValid() === false) {
      saveLocalStorage('user', { email: form.emailUser });
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
            disabled={ isValid() }
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
