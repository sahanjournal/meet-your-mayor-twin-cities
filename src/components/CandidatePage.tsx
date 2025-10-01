import React from "react";
import { PageLayout } from "./PageLayout";
import { InternalLink, OutboundLink } from "./Links";
import { formatCandidateContent } from "./QuizContent";
import {
  CityProvider,
  formatContent,
  getFullCityName,
  kebabCase,
  useCity,
} from "../utils";
import { CandidateSelectorMenu } from "./CandidateSelectorMenu";
import { SocialShareButtons } from "./SocialShareButtons";
import { RecentCoverage } from "./RecentCoverage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NewsletterSignupBanner } from "./NewsletterSignup";
import { useAppStore } from "../useAppStore";
import { getQuestionsLeftToAnswer } from "./Results";

const MINNEAPOLIS_OPEN_ENDED_QUESTIONS = [
  "Why are you running for mayor?",
  "As mayor, how will you advocate for immigrants and communities of color?",
  "Should homeless encampments be allowed to exist in Minneapolis? When should the city clear homeless encampments?",
  "Do you agree with how the city handled its presence at the federal drug investigation on Lake Street in June, and how can Minneapolis improve its response in future incidents?",
  "Do you support the policing reforms in the recently abandoned federal consent decree against Minneapolis police? If yes, how should the city ensure these reforms are enacted?",
  "How can the city make up for lost federal grants and revenue due to cuts from the Trump administration?",
];

const ST_PAUL_OPEN_ENDED_QUESTIONS = [
  "Why are you running for mayor?",
  "As mayor, how will you advocate for immigrants and communities of color?",
  "How can the city revive downtown, which is home to several vacant offices?",
  "How can the city best prevent another cyberattack",
  "The corridor in Midway starting at Snelling Ave and University Ave has lost or is losing several businesses. What should the mayor do to revive this corridor, which is home to many communities of color?",
  "Do you support the city’s sanctuary policy, and should it be expanded?",
  "How can the city make up for lost federal grants and revenue due to cuts from the Trump administration?",
];

const CandidatePage: React.FC<{ pageContext: any }> = ({ pageContext }) => {
  const { city } = pageContext;

  return (
    <CityProvider city={city}>
      <CandidatePageContent pageContext={pageContext} />
    </CityProvider>
  );
};

const CandidatePageContent: React.FC<{ pageContext: any }> = ({
  pageContext,
}) => {
  const { candidateName } = pageContext;
  const score = useAppStore((state) => state.score);
  const city = useCity();

  const candidateInfo = formatCandidateContent(city).find(
    (candidate) => candidate.name === candidateName
  );

  const candidateStats =
    score &&
    score.find((candidate) => candidate.candidateName === candidateName);

  const questionsLeftToAnswer = getQuestionsLeftToAnswer();

  const candidateScore =
    questionsLeftToAnswer.length === 0
      ? !!candidateStats
        ? Math.round(
            (candidateStats.totalScore / candidateStats.totalPossibleScore) *
              100
          )
        : 0
      : null;

  if (!candidateInfo) return <></>;

  const {
    website,
    age,
    occupation,
    neighborhood,
    party,
    quote1,
    quote2,
    quote3,
    quote4,
    quote5,
    quote6,
    quote7,
  } = candidateInfo;

  return (
    <PageLayout
      customMetadata={{
        shareImageFilename:
          city === "st-paul"
            ? "meet-your-mayor-st-paul.jpg"
            : "meet-your-mayor-minneapolis.jpg",
        siteName: `${candidateName} | ${
          city === "st-paul"
            ? "Meet Your St. Paul Mayor 2025"
            : "Meet Your Minneapolis Mayor 2025"
        }`,
        seoHeadline: `${candidateName}: Meet Your Mayor ${getFullCityName(
          city
        )}`,
        socialHeadline: `${candidateName}: Meet Your Mayor ${getFullCityName(
          city
        )}`,
        socialDescription: `Candidates for ${getFullCityName(
          city
        )} mayor told us where they stand on issues. Which is the top match for you? Find out before heading to the polls.`,
        seoDescription: `Candidates for ${getFullCityName(
          city
        )} mayor told us where they stand on big issues. Which is the top match for you? Take our quiz to find out before you head to the polls.`,
      }}
    >
      <div className="container pt-6" style={{ maxWidth: "1100px" }}>
        <div className="eyebrow">
          <InternalLink to="/">
            <div
              className="mr-1 is-hidden-mobile"
              style={{
                display: "inline-block",
                transform: "translateY(-2px) rotate(-135deg)",
              }}
            >
              ↗
            </div>
            Meet your mayor
          </InternalLink>
        </div>
        <h1 className="headline has-text-left mt-1">{candidateName}</h1>
        <div className="columns candidate-page-intro">
          <div className="column is-two-fifths-desktop is-half-tablet">
            <figure
              className="image"
              style={{
                // This reduces the flickr affect when the photo is still loading
                // by maintaining a certain height on the container
                minHeight: "325px",
              }}
            >
              <LazyLoadImage
                src={`../../photos/${kebabCase(candidateName)}-photo.png`}
                effect="blur"
                alt={candidateName}
                style={{
                  maxWidth: "350px",
                  maxHeight: "350px",
                  borderRadius: "100%",
                }}
              />
            </figure>
          </div>
          <div className="column">
            <CandidateSelectorMenu />
          </div>
        </div>
      </div>
      <div className="container pt-6" style={{ maxWidth: "600px" }}>
        {questionsLeftToAnswer.length === 0 && (
          <div className="eyebrow is-align-items-center mb-5">
            Based on your quiz results, you're a <b>{candidateScore}% match</b>
          </div>
        )}
        <div className="field is-grouped">
          {!!website && (
            <OutboundLink to={website}>
              <button className="button mb-1">Campaign Website</button>
            </OutboundLink>
          )}
          <InternalLink to="/">
            <button className="button is-white mb-1">
              {questionsLeftToAnswer.length === 0
                ? `Revisit the quiz`
                : "See if you're a match"}
            </button>
          </InternalLink>
        </div>
        <div className="eyebrow has-text-left mt-5 mb-2 is-flex is-align-items-center">
          <div className="mr-3 is-flex-shrink-2">Share Meet Your Mayor:</div>{" "}
          <SocialShareButtons />
        </div>

        <div className="p-3 has-color-background my-6">
          {!!age && (
            <div className="eyebrow has-text-left mt-0 mb-4">
              <span className="has-text-weight-semibold">Age: </span>
              {age}
            </div>
          )}

          {!!party && (
            <div className="eyebrow has-text-left mb-4">
              <span className="has-text-weight-semibold">Party: </span>
              {party}
            </div>
          )}

          {!!occupation && (
            <div className="eyebrow has-text-left mb-4">
              <span className="has-text-weight-semibold">Occupation: </span>
              {occupation}
            </div>
          )}

          {!!neighborhood && (
            <div className="eyebrow has-text-left mb-0">
              <span className="has-text-weight-semibold">Neighborhood: </span>
              {neighborhood}
            </div>
          )}
        </div>

        {city === "st-paul"
          ? [quote1, quote2, quote3, quote4, quote5, quote6, quote7].map(
              (quote, i) => (
                <div className="copy" key={i}>
                  <h3 className="deck has-text-left mb-4 has-text-weight-semibold">
                    {ST_PAUL_OPEN_ENDED_QUESTIONS[i]}
                  </h3>
                  {formatContent(quote, true)}
                </div>
              )
            )
          : [quote1, quote2, quote3, quote4, quote5, quote6].map((quote, i) => (
              <div className="copy my-2 py-2" key={i}>
                <h3 className="deck has-text-left mb-4 has-text-weight-semibold">
                  {MINNEAPOLIS_OPEN_ENDED_QUESTIONS[i]}
                </h3>
                {formatContent(quote, true)}
              </div>
            ))}
      </div>
      {/* <div className="container">
        <div className="columns">
          {quotes.map((quoteInfo, i) => {
            const { subject, quote, source } = quoteInfo;
            return (
              <div className="column" key={i}>
                <div
                  className="container px-6 pt-6 pb-5 has-color-background"
                  style={{
                    height: "100%",
                  }}
                >
                  <div
                    className="eyebrow has-white-background mb-4 px-1 is-inline-flex"
                    style={{ borderRadius: "10%" }}
                  >
                    ON: {subject}
                  </div>
                  <div className="mb-5">
                    <div className="copy">{formatContent(quote)}</div>
                    {source && (
                      <p key={i} className="copy mb-0">
                        {
                          convertToHtml(source.replace("</a>", "</a><br/>")) // Add a line break after each hyperlink
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <div className="container pt-5 mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="headline has-text-left mt-6">Election Coverage</h1>
        <RecentCoverage />
        <div className="mt-6">
          <NewsletterSignupBanner />
        </div>
      </div>
    </PageLayout>
  );
};

export default CandidatePage;
