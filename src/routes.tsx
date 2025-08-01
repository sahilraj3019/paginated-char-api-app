import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterPage,
});

const routeTree = rootRoute.addChildren([homeRoute, characterRoute]);
export const router = createRouter({ routeTree });
export { homeRoute };
