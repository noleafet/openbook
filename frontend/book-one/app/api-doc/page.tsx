import { Metadata } from 'next';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: #ffffff;
    color: #171717;
  }
`;

export const metadata: Metadata = {
  title: 'API Documentation', // This sets the browser tab title
  description: 'Swagger API Documentation',
};

export default function ApiDocPage() {
  return (
    <>
    <GlobalStyles />
    <SwaggerUI url={`${process.env.NEXT_SWAGGER_URL}`} />
    </>
  );
}