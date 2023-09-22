import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForms from '../../hooks/useForms';
import { loginSucess } from '../../redux/actions';
import { Dispatch } from '../../types';
import { isValid, saveLocalStorage } from '../../utils/isValid';

function Login() {
  const INITAL_STATE = {
    email: '',
    password: '',
  };
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setValidation] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginSucess(form));
    navigate('/meals');
    const SAVE_EMAIL = {
      email,
    };
    saveLocalStorage('user', JSON.stringify(SAVE_EMAIL));
  };

  const { handleChange, form } = useForms(INITAL_STATE);
  const { email, password } = form;

  useEffect(() => {
    console.log(isValid(email, password));
    if (isValid(email, password)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [email, password]);
  return (
    <main>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <Input
          type="text"
          label="email"
          name="email"
          data-testid="email-input"
          onChange={ handleChange }
          value={ email }
        />
        <Input
          data-testid="password-input"
          name="password"
          type="password"
          label="password"
          value={ password }
          onChange={ handleChange }
        />
        <div>
          <button
            className="btn-login"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
          >
            Enter
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
