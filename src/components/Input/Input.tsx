type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label = '', ...props }: InputProps) {
  return (
    <label htmlFor={ props.id }>
      {label}
      <input id={ props.id } type="text" { ...props } />
    </label>
  );
}
export default Input;
