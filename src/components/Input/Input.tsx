import style from './Input.module.css';

type InputProps = {
  label?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  inputStyle?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label = '',
  labelStyle = {},
  labelClassName = '',
  inputStyle = '',
  ...props
}: InputProps) {
  return (
    <label htmlFor={ props.id } style={ labelStyle } className={ style[labelClassName] }>
      {label}
      <input id={ props.id } className={ style[inputStyle] } { ...props } />
    </label>
  );
}
export default Input;
