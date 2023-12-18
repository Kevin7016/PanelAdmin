import style from "./button.module.css";

const Button = ({
  text = "vacio",
  name,
  onClick,
  disabled = false,
  customStyles,
  type,
  children,
}: {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  customStyles?: string;
  type?: "button" | "submit" | "reset" | undefined ;
  children?: React.ReactNode;
  name?:string;
}) => {
  
  return (
    <button
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        onClick && onClick(event);
      }}
      className={`${style["button"]} ${customStyles}`}
      type={type}
      name={name}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
