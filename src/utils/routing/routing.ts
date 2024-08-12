const profileIdParameter = "profileId";

type Route = "home" | "profile";

const routePathsMap: Record<Route, string> = {
  home: "/",
  profile: `/profile/:${profileIdParameter}`,
};

const getHrefTo = (basePath: Route, ...parameters: string[]): string =>
  parameters.length === 0
    ? `/${basePath}`
    : `/${basePath}/${parameters.join("/")}`;

export { getHrefTo, routePathsMap };
