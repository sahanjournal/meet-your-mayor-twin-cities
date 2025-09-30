import React, { useState, FormEvent, ChangeEvent } from "react";
import { RequestStatus } from "./NewsletterSignup";
import { ScoreCard } from "./QuizContent";
import { City, useCity } from "../utils";

export const EmailMeMyResults: React.FC<{ topMatches: ScoreCard }> = ({
  topMatches,
}) => {
  const city = useCity();
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<RequestStatus>("idle");

  const topMatchesFormatted = topMatches
    .map(
      (match, i) =>
        `${i + 1}. ${match.candidateName} (${Math.round(
          (match.totalScore / match.totalPossibleScore) * 100
        )}% match)`
    )
    .join("\n");

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
            quizResults: topMatchesFormatted,
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
    <div>
      <form
        onSubmit={handleSubmit(city)}
        className="is-flex is-justify-content-center"
      >
        <div className="field">
          <div className="is-flex is-align-items-center">
            <div className="control mr-3 is-flex-grow-1">
              <input
                className="input is-small"
                type="email"
                aria-label="Input an email to send your results to"
                placeholder="Email them to me"
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
                    Sending
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </>
                ) : (
                  <>Send</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {status === "success" ? (
        <p className="label mt-2 has-text-centered">
          Results sent to your email!
        </p>
      ) : status === "error" ? (
        <p className="label mt-2 has-text-centered">
          Something went wrong. Please try again later.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
