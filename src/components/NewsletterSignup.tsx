import React, { useState, FormEvent, ChangeEvent } from "react";
import { OutboundLink } from "./Links";
import classnames from "classnames";
import { City, useCity } from "../utils";

const SAHAN_FALLBACK_NEWSLETTER_LINK = "https://sahanjournal.com/newsletter/";

export type RequestStatus = "idle" | "loading" | "success" | "error";

export const NewsletterSignupBanner: React.FC<{
  isOnLandingPage?: boolean;
}> = ({ isOnLandingPage }) => {
  const city = useCity();
  const [email, setEmail] = useState<string>("");
  const [statusSahan, setStatusSahan] = useState<RequestStatus>("idle");

  /**
   * Sign up for Sahan Journal's newsletter via direct API request.
   */
  const submitSahan = async (e: FormEvent<HTMLFormElement>, city: City) => {
    e.preventDefault();
    setStatusSahan("loading");
    try {
      const response = await fetch(
        "https://sahan-mail.netlify.app/.netlify/functions/subscribe",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            city,
          }),
        }
      );

      if (response.ok) {
        setStatusSahan("success");
        setEmail("");
      } else {
        setStatusSahan("error");
      }
    } catch (error) {
      setStatusSahan("error");
    }
  };

  const handleSubmit =
    (city: City) => async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setStatusSahan("loading");

      submitSahan(e, city);
    };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className="newsletter-signup"
      style={{ maxWidth: isOnLandingPage ? "350px" : "unset" }}
    >
      <div
        className={classnames("container", "py-4", isOnLandingPage && "px-4")}
      >
        <form
          onSubmit={handleSubmit(city)}
          className={classnames(
            "is-flex",
            !isOnLandingPage && "is-justify-content-center"
          )}
        >
          <div className="field">
            <div
              className={classnames(
                "eyebrow",
                "mb-2",
                !isOnLandingPage && "has-text-centered"
              )}
            >
              Keep up with the election and other news from Sahan Journal:
            </div>
            <div
              className={classnames(
                "is-flex",
                !isOnLandingPage && "is-align-items-center"
              )}
            >
              <div className="control mr-3 is-flex-grow-1">
                <input
                  className="input is-small"
                  type="email"
                  aria-label="Input your email for election updates"
                  placeholder="e.g. mayor@nyc.gov"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="control">
                <button
                  className="button is-small is-white mt-1"
                  type="submit"
                  disabled={statusSahan === "loading"}
                >
                  {statusSahan === "loading" ? (
                    <>
                      Submitting
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </>
                  ) : (
                    <>Sign Up</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
        {statusSahan === "success" ? (
          <p
            className={classnames(
              "label mt-2",
              !isOnLandingPage && "has-text-centered"
            )}
          >
            You're signed up!
          </p>
        ) : statusSahan === "error" ? (
          <p
            className={classnames(
              "label mt-2",
              !isOnLandingPage && "has-text-centered"
            )}
          >
            Something went wrong. Sign up manually via{" "}
            <OutboundLink to={SAHAN_FALLBACK_NEWSLETTER_LINK}>
              Sahan Journal
            </OutboundLink>
            .
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
