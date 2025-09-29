import React, { useState, FormEvent, ChangeEvent } from "react";
import { OutboundLink } from "./Links";
import classnames from "classnames";

const SAHAN_NEWSLETTER_LIST_ID = "group-3a7bd0557a-6810d0b0bd";

const SAHAN_FALLBACK_NEWSLETTER_LINK = "https://sahanjournal.com/newsletter/";

export type RequestStatus = "idle" | "loading" | "success" | "error";

export const NewsletterSignupBanner: React.FC<{
  isOnLandingPage?: boolean;
}> = ({ isOnLandingPage }) => {
  const [email, setEmail] = useState<string>("");
  const [statusSahan, setStatusSahan] = useState<RequestStatus>("idle");

  /**
   * Sign up for Sahan Journal's newsletter via direct API request.
   */
  const submitSahan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusSahan("loading");
    try {
      const response = await fetch(
        `https://sahanjournal.com/newsletter/?lists%5B%5D=${SAHAN_NEWSLETTER_LIST_ID}&npe=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusSahan("loading");

    submitSahan(e);
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
          onSubmit={handleSubmit}
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
