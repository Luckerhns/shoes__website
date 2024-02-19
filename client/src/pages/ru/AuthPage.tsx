import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import { checkEmail } from "../../components/Functions/CheckEmail";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { PublicRoutesEnum } from "../../utils/consts";
import UserComponent from "../../components/Auth/UserComponent";
import AdminComponent from "../../components/Auth/AdminComponent";

const AuthPage = () => {
  const userData: any = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userData.role === "ADMIN";

  return (
    <MainLayout>
      {isAdmin ? <AdminComponent /> : <UserComponent userData={userData} />}
    </MainLayout>
  );
};

export default AuthPage;
