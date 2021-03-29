import React from "react";
import { NavLink } from "react-router-dom";

export default function MyNavLink(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NavLink {...props} activeClassName="active" />;
}
