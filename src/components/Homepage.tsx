import React from "react";
import { PageLayout } from "./PageLayout";
import Quiz from ".//Quiz";
import { CandidateSelectorMenu } from ".//CandidateSelectorMenu";
import { SocialShareButtons } from ".//SocialShareButtons";
import { SmoothScroll } from ".//Links";
import { RecentCoverage } from ".//RecentCoverage";
import { IntroAnimation } from ".//IntroAnimation";
import { NewsletterSignupBanner } from ".//NewsletterSignup";
import { getQuestionsLeftToAnswer } from ".//Results";
import { useAppStore } from "../useAppStore";
import { getFullCityName, useCity } from "../utils";
import { navigate } from "gatsby";

const getDateUpdated = () => {
  const timestamp = process.env.GATSBY_UPDATE_DATE;
  if (!timestamp) {
    throw new Error("No publication date defined in .env file!");
  } else {
    const date = new Date(timestamp.replace(/-/g, "/"));
    const dateFormatted = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateFormatted;
  }
};

const Homepage = () => {
  const city = useCity();
  const cityName = !!city ? getFullCityName(city) : "Minneapolis";
  const questionsLeftToAnswer = getQuestionsLeftToAnswer();
  const highestVisibleQuestion = useAppStore(
    (state) => state.highestVisibleQuestion
  );

  return (
    <PageLayout
      customMetadata={{
        slug: `${process.env.GATSBY_SLUG}/${city}`,
        shareImageFilename:
          city === "st-paul"
            ? "meet-your-mayor-st-paul.jpg"
            : "meet-your-mayor-minneapolis.jpg",
        siteName: `Meet Your ${getFullCityName(city)} Mayor 2025`,
        seoHeadline: `Meet Your ${getFullCityName(city)} Mayor: Take this quiz`,
        socialHeadline: `Take the Quiz: Meet Your ${getFullCityName(
          city
        )} Mayor`,
        socialDescription: `Candidates for ${getFullCityName(
          city
        )} mayor told us where they stand on issues. Which is the top match for you? Find out before heading to the polls.`,
        seoDescription: `Candidates for ${getFullCityName(
          city
        )} mayor told us where they stand on big issues. Which is the top match for you? Take our quiz to find out before you head to the polls.`,
      }}
    >
      <div className="hero is-fullheight-with-navbar has-color-background">
        <IntroAnimation isMobile />
        <div className="hero-body pt-6">
          <div className="columns" style={{ width: "100%" }}>
            <div className="column is-half">
              <p className="eyebrow has-text-left mb-1 has-text-weight-semibold">
                {cityName}
              </p>
              <h1 className="headline has-text-left mt-0 mb-3">
                Meet Your Mayor 2025
              </h1>
              <div className="attribution">
                <p className="eyebrow has-text-left mb-2">
                  Updated: {getDateUpdated()}
                </p>
                <p className="deck has-text-left" style={{ maxWidth: "600px" }}>
                  Who should you rank on your ballot to be the next mayor of{" "}
                  {cityName}? Take the same quiz the candidates did and find
                  your closest match.
                </p>
                <div className="is-flex is-flex-direction-column mt-5 mb-6">
                  <SmoothScroll
                    className="mb-4"
                    to={
                      questionsLeftToAnswer.length === 0
                        ? "results"
                        : highestVisibleQuestion > 1
                        ? `question-${questionsLeftToAnswer[0]}`
                        : "quiz"
                    }
                  >
                    <button
                      className="button is-extra-dark"
                      style={{ width: "100%", maxWidth: "350px" }}
                    >
                      {questionsLeftToAnswer.length === 0
                        ? "View my results"
                        : highestVisibleQuestion > 1
                        ? "Continue the quiz"
                        : "Take the quiz"}
                    </button>
                  </SmoothScroll>
                  <button
                    className="button is-white"
                    onClick={() =>
                      // Since we use the #learn container to smooth scroll to the #results
                      // section from a Candidate page, we need to make sure this button here
                      // clears the location state so that it indeed goes to #learn.
                      navigate("#learn", { replace: true })
                    }
                    style={{ width: "100%", maxWidth: "350px" }}
                  >
                    See the candidates{" "}
                  </button>
                </div>
                <div className="homepage-election-updates">
                  <NewsletterSignupBanner isOnLandingPage />
                </div>
                <div className="eyebrow has-text-left mt-4 mb-2 is-flex is-align-items-center">
                  <div className="mr-3 is-flex-shrink-2 pl-4">
                    Share Meet Your Mayor:
                  </div>{" "}
                  <SocialShareButtons />
                </div>
              </div>
            </div>
            <IntroAnimation />
          </div>
        </div>
      </div>
      <Quiz />
      <NewsletterSignupBanner />
      <div className="hero is-fullheight-with-navbar pt-6">
        <div className="container mt-6 pt-5" id="learn">
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="eyebrow">
                <a href="#quiz">
                  <div
                    className="mr-1 is-hidden-mobile"
                    style={{
                      display: "inline-block",
                      transform: "translateY(-2px) rotate(-90deg)",
                    }}
                  >
                    ↗
                  </div>
                  Take our quiz
                </a>
              </div>
              <h1
                className="headline has-text-left mt-2"
                style={{ maxWidth: "650px" }}
              >
                About the Candidates
              </h1>
              <p
                className="copy has-text-left ml-0 mb-6"
                style={{ maxWidth: "650px" }}
              >
                We asked the candidates additional questions that didn't make it
                into the quiz. Click on the candidates' pictures below to read
                more about why they're running for office, and their views on{" "}
                {city === "st-paul"
                  ? "revitalizing downtown, business loss on University Avenue"
                  : "homeless encampments, police reform"}{" "}
                and more.
              </p>
              <CandidateSelectorMenu />
            </div>
            <div className="column">
              <div className="eyebrow is-inline-block"> </div>
              <h1 className="headline has-text-left mt-1">Recent News</h1>
              <RecentCoverage />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Homepage;
