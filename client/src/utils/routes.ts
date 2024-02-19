import AdminPage from "../components/Auth/AdminComponent";
import BasketPage from "../pages/ru/BasketPage";
import GoodPage from "../pages/ru/GoodPage";
import MainPage from "../pages/ru/MainPage";
import AuthPage from "../pages/ru/AuthPage";
import { IRoute } from "../types/routes";
import { PrivateRoutesEnum, PublicRoutesEnum } from "./consts";

export const publicRoutes: IRoute[] = [
  { path: PublicRoutesEnum.MainPath, element: MainPage },
  // { path: PublicRoutesEnum.UserPath, element: UserPage },
  { path: PublicRoutesEnum.GoodPath + "/:param" + "/:good", element: GoodPage },
];

export const privateRoutes: IRoute[] = [
  { path: PrivateRoutesEnum.AdminPage, element: AdminPage },
  { path: PublicRoutesEnum.UserPath, element: AuthPage },
  { path: PublicRoutesEnum.MainPath, element: MainPage },
  { path: PublicRoutesEnum.BasketPath, element: BasketPage },
];
