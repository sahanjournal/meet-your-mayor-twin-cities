import React from "react";
import Homepage from "../../components/Homepage";
import { CityProvider } from "../../utils";

const Page = () => (
  <CityProvider city="st-paul">
    <Homepage />
  </CityProvider>
);

export default Page;
