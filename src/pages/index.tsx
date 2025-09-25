import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { CityProvider } from "../utils";

/**
 * The path that users will be redirected to when they visit the root URL.
 */
const DEFAULT_REDIRECT_PATH = "/minneapolis";

const RedirectPage = () => {
  const handleRedirect = () => {
    navigate(DEFAULT_REDIRECT_PATH);
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <CityProvider city="minneapolis">
      <PageLayout>
        <section className="hero is-white is-fullheight is-flex is-justify-content-center is-align-items-center">
          <div className="has-text-centered">
            <button
              className="button is-loading is-large is-white"
              style={{ border: "none", boxShadow: "none" }}
            >
              {/* Invisible button just to use Bulma's loading spinner */}
            </button>
            <p className="eyebrow mt-3">Redirecting...</p>
          </div>
        </section>
      </PageLayout>
    </CityProvider>
  );
};

export default RedirectPage;
