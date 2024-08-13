const profileIdParameter = "profileId";
const accountIdParameter = "accountId";

type Route = "account" | "home" | "profile";

const routePathsMap: Record<Route, string> = {
  account: `/account/:${accountIdParameter}`,
  home: "/",
  profile: `/profile/:${profileIdParameter}`,
};

const getHrefTo = (basePath: Route, ...parameters: string[]): string =>
  parameters.length === 0
    ? `/${basePath}`
    : `/${basePath}/${parameters.join("/")}`;

export { getHrefTo, routePathsMap };
