import * as React from "react";

import { IReactEmailTemplate } from "@kaviar/email-bundle";

export interface IWelcomeEmailProps {
  name: string;
}

export const {{emailName}}Email: IReactEmailTemplate<IWelcomeEmailProps> = (
  props
) => {
  return <div>Hello {props.name}</div>;
};

{{emailName}}Email.subject = (props) => `Hello ${props.name}`;