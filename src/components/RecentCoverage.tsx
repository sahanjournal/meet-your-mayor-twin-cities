import React from "react";
import { OutboundLink } from "./Links";
import { track } from "@amplitude/analytics-browser";

const LINKS_JSON_URL_PREFIX =
  "https://sahanjournal.com/wp-json/wp/v2/posts?categories=15";

const DONATION_URL = "https://sahanjournal.fundjournalism.org/";

const DEFAULT_LINKS = [
  {
    text: "'12 They’re coming for everyone': Fearful NY immigrant families weigh voluntary departures",
    href: "https://gothamist.com/news/theyre-coming-for-everyone-fearful-ny-immigrant-families-weigh-voluntary-departures",
  },
  {
    text: "Housing could be on the ballot in NYC. Here’s what New Yorkers may be voting on.",
    href: "https://gothamist.com/news/housing-could-be-on-the-ballot-in-nyc-heres-what-new-yorkers-may-be-voting-on",
  },
  {
    text: "NY AG James says she’s suing Trump administration over cuts to health and social programs",
    href: "https://gothamist.com/news/ny-ag-james-says-shes-suing-trump-administration-over-cuts-to-health-and-social-programs",
  },
];

const testValidSetOfLinks = (links: any[]) => {
  if (!Array.isArray(links)) {
    throw new Error("Links is not an array");
  }
  if (links.length !== 3) {
    throw new Error("Links array is not the correct length");
  }
  links.forEach((link) => {
    if (typeof link.text !== "string" && link.text.length > 5) {
      throw new Error("Link text is not a string");
    }
    if (typeof link.href !== "string" && link.href.length > 5) {
      throw new Error("Link href is not a string");
    }
  });
};

export const RecentCoverage: React.FC = () => {
  const [links, setLinks] = React.useState(DEFAULT_LINKS);

  React.useEffect(() => {
    fetch(`${LINKS_JSON_URL_PREFIX}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch JSON");
        }
        return response.json();
      })
      .then((json) => {
        const formattedLinks = json.slice(0, 3).map((item: any) => ({
          text: item.title.rendered,
          href: item.link,
        }));
        testValidSetOfLinks(formattedLinks);
        return formattedLinks;
      })
      .then((formattedLinks) => setLinks(formattedLinks))
      .catch((error) =>
        console.error("Error loading Gothamist Links JSON:", error)
      );
  }, []);

  return (
    <>
      <div className="eyebrow mb-2 mt-3">SAHAN JOURNAL</div>
      <ul>
        {links.map((link, i) => (
          <li key={i} className="label is-flex mb-0">
            <div className="mr-2 mt-1">●</div>{" "}
            <OutboundLink
              to={link.href}
              className="copy has-text-left ml-0"
              style={{ lineHeight: "1.4rem" }}
            >
              {link.text}
            </OutboundLink>
          </li>
        ))}
      </ul>
      <OutboundLink to={DONATION_URL}>
        <div
          className="button is-white is-small mt-3"
          aria-label="Donate to THE CITY"
          onClick={() => {
            track("Clicked THE CITY Donate button");
          }}
        >
          Donate
        </div>
      </OutboundLink>
    </>
  );
};
