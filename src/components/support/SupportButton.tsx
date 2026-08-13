import React from "react";

type Props = React.ComponentPropsWithoutRef<"a"> & { to?: string };

export default function SupportButton({ to = "/soutenir", onClick, children, ...rest }: Props) {
  const handle = (e: React.MouseEvent) => {
    if (onClick) onClick(e as any);
    e.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new Event("routechange"));
  };

  return (
    <a {...rest} href={to} onClick={handle}>
      {children}
    </a>
  );
}
