import { ButtonHTMLAttributes, FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <button className="button" {...rest} disabled={loading}>
      {loading ? <AiOutlineLoading3Quarters className="spinner" /> : children}
    </button>
  );
};

export default Button;
