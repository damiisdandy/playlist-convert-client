import { FC, useState, FormEvent, ChangeEventHandler } from "react";
import { useMutation } from "react-query";
import Navbar from "./components/navbar";
import Playlist from "./components/playlist";
import { axiosInstance } from "./config";
import gradientBackground from "./images/background.jpeg";
import { Helmet } from "react-helmet";

const App: FC = () => {
  const [value, setValue] = useState("");

  const { isLoading, mutate, data, isError } = useMutation(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return axiosInstance.post("/get-playlist", { url: value });
    }
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hoodini</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="background-image">
        <img src={gradientBackground} alt="gradient background" />
      </div>
      <div className="main">
        <Navbar
          isLoading={isLoading}
          mutate={mutate}
          onChange={onChange}
          value={value}
        />
        <main>
          <h1 className="header">
            Move your playlist
            <br /> anywhere
          </h1>
          <p className="description">
            Tranfer playlist from one streaming platform to another, stress
            free!
          </p>
          <p className="description small">
            (Currently does not support Apple music 😔, becuase Apple is
            behaving bitchy! 😑)
          </p>
          <Playlist isLoading={isLoading} error={isError} data={data?.data} />
        </main>
      </div>
    </div>
  );
};

export default App;
