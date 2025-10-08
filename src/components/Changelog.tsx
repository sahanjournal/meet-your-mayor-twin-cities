import React from "react";
import { City, useCity } from "../utils";

/**
 * An array of objects, which include a date in the format like "May 21, 2025",
 * and an array of React fragments that describe changes to the quiz.
 *
 * NOTE: Please use the <OutboundLink> component for hyperlinks.
 */
const CHANGELOG_ENTRIES = [
  {
    date: "October 7, 2025",
    city: "st-paul" as City,
    changes: [
      <>
        St. Paul mayoral candidate Kaohly Vang Her's campaign mistakenly marked
        "yes" to the question #4 about whether the state should require its
        employees to return to the office full time. Vang Her's response is
        actually "maybe."
      </>,
    ],
  },
  {
    date: "October 8, 2025",
    city: "st-paul" as City,
    changes: [
      <>
        CORRECTION: St. Paul voters approved rent control in 2021, which was
        amended in 2023. St. Paul voters can rank up to six candidates.
      </>,
    ],
  },
];

export const Changelog = () => {
  const city = useCity();
  const changes = CHANGELOG_ENTRIES.filter((entry) => entry.city === city);
  if (changes.length > 0)
    return (
      <>
        <p className="mt-3 has-text-weight-semibold">Updates</p>
        <div className="my-3">
          {changes.map((entry, i) => (
            <div key={i}>
              {entry.date}
              <ul className="mt-1">
                {entry.changes.map((change, i) => (
                  <li className="label is-flex my-0" key={i}>
                    <div className="mr-2 mt-1">●</div>{" "}
                    <span className="copy has-text-left ml-0 mb-1">
                      {change}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  else return <></>;
};
