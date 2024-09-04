import * as React from "react";

interface EmailTemplateProps {
  url: URL;
}

export const MagicLinkTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  url,
}) => (
  <div>
    <h1>Welcome!</h1>
    <a href={url.toString()}>Click here to sign in</a>
  </div>
);
