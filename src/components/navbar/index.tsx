import { ChangeEventHandler, FC, FormEventHandler } from "react";
import Button from "../button";

interface NavbarProps {
  mutate: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  isLoading: boolean;
}

const Navbar: FC<NavbarProps> = ({ mutate, onChange, value, isLoading }) => {
  return (
    <div className="Navbar">
      <h1>Hoodini🧞</h1>
      <form className="Input" onSubmit={mutate}>
        <input
          required
          onChange={onChange}
          value={value}
          placeholder="Enter playlist url"
          type="url"
        />
        <Button loading={isLoading} type="submit">
          Search
        </Button>
      </form>
      <a
        className="link"
        href="https://damiisdandy.com"
        target="_blank"
        rel="noreferrer"
      >
        Developer
      </a>
    </div>
  );
};

export default Navbar;
