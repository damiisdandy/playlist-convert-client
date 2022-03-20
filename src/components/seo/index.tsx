import { Helmet } from "react-helmet";

const Seo = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Hoodini | By Damiisdandy</title>
      <link rel="canonical" href="https://hoodini.damiisdandy.com" />
      <meta charSet="utf-8" />

      {/* HTML Meta Tags */}
      <meta
        name="description"
        content=" Tranfer playlist from one streaming platform to another, stress
            free!"
      />

      {/* Facebook Meta Tags  */}
      <meta property="og:url" content="https://www.jetronmall.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hoodini | By Damiisdandy" />
      <meta
        property="og:description"
        content=" Tranfer playlist from one streaming platform to another, stress
            free!"
      />

      {/* Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="jetronmall.com" />
      <meta property="twitter:url" content="https://www.jetronmall.com/" />
      <meta name="twitter:title" content="Hoodini | By Damiisdandy" />
      <meta
        name="twitter:description"
        content=" Tranfer playlist from one streaming platform to another, stress
            free!"
      />
    </Helmet>
  );
};

export default Seo;
