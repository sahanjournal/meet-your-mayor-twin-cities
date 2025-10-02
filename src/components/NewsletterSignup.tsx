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
  const [status, setStatus] = useState<RequestStatus>("idle");

  /**
   * Sign up for Sahan Journal's newsletter via direct API request.
   */
  const submitSahan = async (e: FormEvent<HTMLFormElement>, city: City) => {
    e.preventDefault();
    setStatus("loading");
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
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleSubmit =
    (city: City) => async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setStatus("loading");

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
              Keep me briefed about the election — and more:
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
                  placeholder="e.g. mayor@mn.gov"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="control">
                <button
                  className="button is-small is-white mt-1"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
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
        {status === "success" ? (
          <p
            className={classnames(
              "label mt-2",
              !isOnLandingPage && "has-text-centered"
            )}
          >
            You're signed up!
          </p>
        ) : status === "error" ? (
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
