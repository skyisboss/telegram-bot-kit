import type { Route } from "../types/bot";
import { homeRoutes } from "./home.route";
import { langRoutes } from "./lang.route";

export const routes: Route = {
  home: homeRoutes,
  lang: langRoutes,
};
