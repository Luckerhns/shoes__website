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
            const data: any | string = await registration({
              username: username,
              email: email,
              password: password,
            });
            if (typeof data !== "string") {
              const user = JSON.stringify(data.user);
              console.log(data);
              dispatch(
                AuthActionCreators.setUser({ username, password, email })
              );
              dispatch(AuthActionCreators.setIsAuth(true));
              localStorage.setItem("user", user);
              localStorage.setItem("isAuth", "true");
              localStorage.setItem("isAdmin", data.role);
              console.log(data, data.user.role);
              dispatch(AuthActionCreators.setIsLoading(false));
            } else {
              dispatch(
                AuthActionCreators.setError("Такой пользователь уже существует")
              );
            }
            // window.location.reload();
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
          dispatch(AuthActionCreators.setIsLoading(true));
          const data = await login({ email: email, password: password });
          if (data) {
            try {
              const data: any | string = await login({
                email: email,
                password: password,
              });
              if (typeof data !== "string") {
                const user = JSON.stringify(data.user);
                console.log(data);
                dispatch(AuthActionCreators.setIsAuth(true));
                localStorage.setItem("user", user);
                localStorage.setItem("isAuth", "true");
                localStorage.setItem("isAdmin", data.user.role);
                console.log(data, data.user.role);
                dispatch(AuthActionCreators.setIsLoading(false));
              } else {
                dispatch(
                  AuthActionCreators.setError(
                    "Такой пользователь уже существует"
                  )
                );
              }
              // window.location.reload();
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          dispatch(
            AuthActionCreators.setError("Ошибка при входе, попробуйте позже")
          );
          console.log(error);
        }
      });
    } catch (error) {
      dispatch(AuthActionCreators.setError("Неправильно введенные данные"));
      console.log(error);
    }
  },
};
