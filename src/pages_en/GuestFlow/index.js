import { lazy } from "react";

export const HomePageEn = lazy(() =>
import("./HomePage").then(({ default: HomePageEn }) => ({
  default: HomePageEn,
}))
);





