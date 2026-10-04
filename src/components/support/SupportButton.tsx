import { translateContent } from "../../i18n/translateContent";
import React from "react";
import { localizedPath, navigateToPath } from "../../routing/routes";

type Props = React.ComponentPropsWithoutRef<"a"> & { to?: string };

export default function SupportButton({ to = "/soutenir", onClick, children, ...rest }: Props) {
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    e.preventDefault();
    navigateToPath(to);
  };

  return (
    <a {...rest} href={localizedPath(to)} onClick={handle}>
      {translateContent(children)}
    </a>
  );
}
