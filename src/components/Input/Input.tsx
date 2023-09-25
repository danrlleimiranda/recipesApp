type InputProps = {
  label?: string;
  labelStyle?: React.CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label = '', labelStyle = {}, ...props }: InputProps) {
  return (
    <label htmlFor={ props.id } style={ labelStyle }>
      {label}
      <input id={ props.id } { ...props } />
    </label>
  );
}
export default Input;
