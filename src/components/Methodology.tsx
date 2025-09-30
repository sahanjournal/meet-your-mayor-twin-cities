import React from "react";
import { OutboundLink } from "./Links";
import { useCity } from "../utils";

export const Methodology = () => {
  const city = useCity();
  return (
    <div className="copy">
      <p className="mt-3">
        Sahan Journal{" "}
        {city === "st-paul"
          ? "sent the quiz to all mayoral candidates on the ballot, who all appear in Meet Your Mayor."
          : "chose a field of six candidates to participate in Meet Your Mayor."}
      </p>
      <p className="mt-3">
        In the quiz, candidates score 1 point for each answer that matches your
        answer. A candidate’s response of “no position” does not count toward
        their score.
      </p>
      <p className="mt-3">
        At the end of the quiz, you can select up to three issues that matter to
        you the most. Each 1-point score in those categories counts as 2 points
        in the final tally.
      </p>
      <p className="mt-3">
        Meet Your Mayor does not collect any personal data from users. We do
        collect quiz responses anonymously to improve this resource and track
        aggregate results.
      </p>
      <p className="mt-3">
        As in 2021, we are pleased to make our code, which originally came from
        <OutboundLink to="https://www.thecity.nyc/">THE CITY</OutboundLink>,
        available on{" "}
        <OutboundLink to="https://github.com/sahanjournal/meet-your-mayor-twin-cities">
          Github
        </OutboundLink>{" "}
        for use by other organizations. So far our project has been adapted for
        mayoral races in{" "}
        <OutboundLink to="https://projects.laist.com/meet-your-mayor-2022-general/">
          Los Angeles
        </OutboundLink>{" "}
        and{" "}
        <OutboundLink to="https://phillymayorquiz.com/">
          Philadelphia
        </OutboundLink>
        . Could your city be next?{" "}
        <OutboundLink to="mailto:contact@sahanjournal.com">
          Drop us a line
        </OutboundLink>
        .
      </p>
      {/* 
    UNCOMMENT TO ENABLE CHANGELOG:

    <p className="mt-3 has-text-weight-semibold">Updates</p>
    <Changelog />
    */}
    </div>
  );
};
