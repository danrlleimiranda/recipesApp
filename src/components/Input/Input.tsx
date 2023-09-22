type InputProps = {
  label?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label = '', type = '', onChange, ...props }: InputProps) {
  return (
    <label htmlFor={ props.id }>
      <input id={ props.id } type={ type } onChange={ onChange } { ...props } />
      {label}
    </label>
  );
}
export default Input;
