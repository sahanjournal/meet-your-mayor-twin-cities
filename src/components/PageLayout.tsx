import React, { useEffect } from "react";
import SahanLogo from "../assets/logo.svg";
import { Helmet } from "react-helmet";
import { OutboundLink } from "./Links";
import { SocialButton } from "./SocialShareButtons";

import "../styles/app.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useCity } from "../utils";
import { Link, Script } from "gatsby";

// DISABLE AMPLITUDE TRACKING FOR NOW:
// import { init } from "@amplitude/analytics-browser";

// const AMPLITUDE_PUBLIC_KEY = "FILL IN YOUR KEY HERE";

const SAHAN_SITE_LINKS = {
  website: "https://sahanjournal.com/",
  x: "https://x.com/sahanjournal",
  instagram: "https://www.instagram.com/sahanjournal/",
  facebook: "https://www.facebook.com/sahanjournal/",
  bluesky: "https://bsky.app/profile/did:plc:ukvib7xzyn5cjdapkhntmmue",
};

const byline = process.env.GATSBY_AUTHOR
  ? JSON.parse(process.env.GATSBY_AUTHOR)
  : ([] as any);

const Header: React.FC<{ hideCityToggle?: boolean }> = ({ hideCityToggle }) => {
  const city = useCity();
  return (
    <nav className="nav has-color-background">
      <div className="nav-container">
        <div className="nav-logo">
          <OutboundLink
            to={SAHAN_SITE_LINKS.website}
            aria-label="THE CITY"
            className="is-flex"
          >
            <SahanLogo />
          </OutboundLink>
        </div>

        <div className="nav-title"></div>
        {!hideCityToggle && (
          <Link
            to={city === "minneapolis" ? "/st-paul" : "/minneapolis"}
            className="button city-toggle is-small has-opposite-background mt-1"
          >
            {city === "minneapolis" ? "St. Paul" : "Minneapolis"} Quiz
          </Link>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer has-color-background">
      <div
        className="container is-flex is-flex-direction-column is-align-items-center p-0"
        style={{ maxWidth: "750px" }}
      >
        <div className="eyebrow">Made with ♥ in the Twin Cities by</div>
        <div className="eyebrow mb-5">
          <OutboundLink
            to={SAHAN_SITE_LINKS.website}
            aria-label=" Sahan Journal"
          >
            Sahan Journal
          </OutboundLink>
        </div>
        <div className="eyebrow">
          {Object.entries(SAHAN_SITE_LINKS)
            .filter((link) => link[0] !== "website")
            .map((link, i) => (
              <SocialButton
                url={link[1]}
                key={i}
                ariaLabel={`Share on ${link[0]}`}
              />
            ))}
        </div>
        <div className="eyebrow mt-6 mb-2 has-text-centered">
          By{" "}
          {byline.map((author: any, i: number) => (
            <span key={i} className="author">
              <OutboundLink to={author.url}>{author.name}</OutboundLink>
              {i < byline.length - 2
                ? ", "
                : i < byline.length - 1
                ? " and "
                : ""}
            </span>
          ))}
          . Illustrations by Andrés Guzmán. Photos provided by candidates’
          campaigns. Meet Your Mayor concept from{" "}
          <OutboundLink to="https://www.thecity.nyc/">THE CITY</OutboundLink>.{" "}
          Original design by{" "}
          <OutboundLink to="https://samrabiyah.com">Sam Rabiyah</OutboundLink>{" "}
          and{" "}
          <OutboundLink to="https://www.thecity.nyc/">THE CITY</OutboundLink>.
        </div>

        <div className="eyebrow mt-5 has-text-centered">
          View source code on{" "}
          <OutboundLink to="https://github.com/sahanjournal/meet-your-mayor-twin-cities">
            Github
          </OutboundLink>
          .
        </div>

        <ul className="footer-links">
          <li>
            <OutboundLink
              to="https://sahanjournal.com/contact/"
              className="button-link"
            >
              Contact Us
            </OutboundLink>
          </li>
          <li>
            <OutboundLink
              to="https://sahanjournal.com/privacy-policy/"
              className="button-link"
            >
              Privacy Policy
            </OutboundLink>
          </li>
        </ul>
        <div className="copyright">© {year}, Sahan Journal </div>
      </div>
    </footer>
  );
};

const Analytics = () => (
  <>
    {/* Google Analytics & Google Tag Manager: */}
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-WNJ80Q5BTH"
    />
    <Script>
      {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WNJ80Q5BTH');
        `}
    </Script>

    {/* Parse.ly Analytics: */}
    <Script
      id="parsely-cfg"
      src="//cdn.parsely.com/keys/sahanjournal.com/p.js"
    />

    {/* Marfeel Analytics: */}
    <Script>
      {`!function(){"use strict";function e(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],c=document.createElement("script");
      c.src=e,t?c.type="module":(c.async=!0,c.type="text/javascript",c.setAttribute("nomodule",""));
      var n=document.getElementsByTagName("script")[0];
      n.parentNode.insertBefore(c,n)}!function(t,c){!function(t,c,n){var a,o,r;
      n.accountId=c,null!==(a=t.marfeel)&&void 0!==a||(t.marfeel={}),null!==(o=(r=t.marfeel).cmd)&&void 0!==o||(r.cmd=[]),t.marfeel.config=n;
      var i="https://sdk.mrf.io/statics";
      e("".concat(i,"/marfeel-sdk.js?id=").concat(c),!0),e("".concat(i,"/marfeel-sdk.es5.js?id=").concat(c),!1)}(t,c,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}(window,"6282",{} /* Config */)}();`}
    </Script>
  </>
);

type MetadataProps = {
  slug?: string;
  siteName?: string;
  /**
   * This should be the filename of an image in the `/static` directory in the root.
   */
  shareImageFilename?: string;
  seoHeadline?: string;
  seoDescription?: string;
  socialHeadline?: string;
  socialDescription?: string;
  author?: {
    name: string;
    url: string;
    "@type": string;
  }[];
};

/**
 * This component wraps child components with a header and footer and adds site metadata
 */
export const PageLayout: React.FC<{
  children: React.ReactNode;
  customMetadata?: MetadataProps;
  hideCityToggle?: boolean;
}> = ({ children, customMetadata, hideCityToggle }) => {
  const city = useCity();

  const slug = customMetadata?.slug || process.env.GATSBY_SLUG;
  const url = `${process.env.GATSBY_DOMAIN}${slug}/`;

  const siteName = customMetadata?.siteName || process.env.GATSBY_SITE_NAME;
  const shareImage = `${process.env.GATSBY_DOMAIN}${process.env.GATSBY_SLUG}/${
    customMetadata?.shareImageFilename || "social-image.jpg"
  }`;
  const seoHeadline =
    customMetadata?.seoHeadline || process.env.GATSBY_SEO_HEADLINE;
  const seoDescription =
    customMetadata?.seoDescription || process.env.GATSBY_SEO_DESCRIPTION;
  const socialHeadline =
    customMetadata?.socialHeadline || process.env.GATSBY_SOCIAL_HEADLINE;
  const socialDescription =
    customMetadata?.socialDescription || process.env.GATSBY_SOCIAL_DESCRIPTION;
  const author = customMetadata?.author || process.env.GATSBY_AUTHOR;

  // Initialize Amplitude Tracking:
  useEffect(() => {
    // init(AMPLITUDE_PUBLIC_KEY);
  });

  return (
    <article
      id="main"
      className={city === "st-paul" ? "st-paul-style" : "minneapolis-style"}
    >
      <Header hideCityToggle={hideCityToggle} />
      <Helmet>
        <title>{`${siteName}`}</title>
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={socialHeadline} />
        <meta property="og:description" content={socialDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en-US" />
        <meta property="twitter:title" content={socialHeadline} />
        <meta property="twitter:description" content={socialDescription} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:image" content={shareImage} />
        <meta property="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`{
          "@type": "NewsArticle",
          "@context": "http://schema.org",
          "headline": "${seoHeadline}",
          "image": {
              "@type": "ImageObject",
              "contentUrl": "${shareImage}",
              "url": "${shareImage}",
              "representativeOfPage": ${true}
          },
          "dateCreated": "${process.env.GATSBY_PUB_DATE}",
          "datePublished": "${process.env.GATSBY_PUB_DATE}",
          "dateModified": "${process.env.GATSBY_UPDATE_DATE}",
          "articleSection": "News Apps",
          "mainEntityOfPage": "${url}",
          "description": "${seoDescription}",
          "publisher": {
              "@type": "Organization",
              "name": "Sahan Journal",
              "url": "https://www.sahanjournal.com",
          },
          "author": ${author}
        }`}</script>
      </Helmet>
      <Analytics />
      {children}
      <Footer />
    </article>
  );
};
