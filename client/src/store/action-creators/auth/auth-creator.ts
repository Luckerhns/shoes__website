import { IRegistrationResponse } from "./../../../types/types";
import { AxiosResponse } from "axios";
import { login, registration } from "../../../http/userApi";
import { AppDispatch } from "./../../store";
import {
  AuthActionsEnum,
  IUser,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./auth";

export const AuthActionCreators = {
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),

  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),

  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  registration:
    (email: string, password: string, username: string[]) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          try {
            const data: any = await registration({
              username: username,
              email: email,
              password: password,
            });
            if (data) {
              dispatch(
                AuthActionCreators.setUser({ username, password, email })
              );
              dispatch(AuthActionCreators.setIsAuth(true));
              const user = JSON.stringify(data.user);
              localStorage.setItem("user", user);
              localStorage.setItem("isAuth", "true");
              dispatch(AuthActionCreators.setIsLoading(false));
              window.location.reload();
            } else {
              dispatch(AuthActionCreators.setError("Ошибка при регистрации"));
            }
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        dispatch(AuthActionCreators.setError("Некорректные данные"));
      }
    },

  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      setTimeout(async () => {
        try {
          dispatch(AuthActionCreators.setIsLoading(true))
          const data = await login({ email: email, password: password });
          if (data) {
            const user = data.user;
            dispatch(
              AuthActionCreators.setUser({
                email: user.email,
                password: user.password,
                username: [user.firstname, user.lastname],
              })
            );
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuth", "true");
            dispatch(AuthActionCreators.setIsLoading(false));
            window.location.reload()
          }
        } catch (error) {
          dispatch(AuthActionCreators.setError("Ошибка при входе, попробуйте позже"))
          console.log(error);
        }
      });
    } catch (error) {
      dispatch(AuthActionCreators.setError("Неправильно введенные данные"))
      console.log(error);
    }
  },
};
