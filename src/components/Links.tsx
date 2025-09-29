import React, { ReactNode } from "react";
import { Link as AnchorLink } from "react-scroll";
import { Link } from "gatsby";
import { useCity } from "../utils";

const DEFAULT_SAHAN_UTM_PARAMS =
  "?utm_source=link&utm_medium=website&utm_campaign=meet%20your%20mayor%202025%20";

// Reuse Gatsby’s LinkProps
type InternalLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  onClick?: () => void;
  replace?: boolean;
  state?: Record<string, unknown>;
};

/**
 * An internal link that automatically prefixes the city subdirectory (if applicable).
 */
export function InternalLink({ to, ...props }: InternalLinkProps) {
  const city = useCity();

  // Only prefix if we detected a valid city
  const cityPrefix =
    city === "minneapolis" || city === "st-paul" ? `/${city}` : "";

  // Normalize the `to` prop so we don’t get double slashes
  const fullPath = `${cityPrefix}${to.startsWith("/") ? to : `/${to}`}`;

  return <Link to={fullPath} {...props} />;
}

export const OutboundLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ to, children, className, style }) => {
  const city = useCity();
  const isSahanLink = to.includes("sahanjournal.com");
  return (
    <a
      className={className}
      style={style}
      href={to + (isSahanLink ? DEFAULT_SAHAN_UTM_PARAMS + city : "")}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

/**
 * How many pixels above each section we should jump to when we click on an anchor link.
 */
export const QUESTION_ANCHOR_LINK_OFFSET = -150;

export const ANCHOR_LINK_DURATION = 800;

const LINKS_WITH_REMOVED_OFFSET = ["quiz", "results"];

export const SmoothScroll: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  extraOffset?: number;
  style?: React.CSSProperties;
  enableActiveClass?: boolean;
  onClick?: () => void;
}> = ({
  to,
  children,
  className,
  extraOffset,
  style,
  enableActiveClass,
  onClick,
}) => {
  return (
    <AnchorLink
      className={className}
      style={style}
      activeClass={enableActiveClass ? "has-text-weight-bold" : ""}
      spy={true}
      smooth={true}
      duration={ANCHOR_LINK_DURATION}
      offset={
        (LINKS_WITH_REMOVED_OFFSET.includes(to)
          ? 0
          : QUESTION_ANCHOR_LINK_OFFSET) + (extraOffset || 0)
      }
      to={to}
      onClick={onClick}
    >
      {children}
    </AnchorLink>
  );
};
