import React from "react";
import styles from "../../styles/UserPage/AdminComponent.module.scss";
import { logout } from "../Functions/AuthFunctions";

const AdminComponent = () => {
  return (
    <div className={styles.admin__page__container}>
      <div className={styles.admin__container}>
        <div className={styles.admin__panel}>dasdsa</div>
        <div className={styles.exit__btn} onClick={() => logout()}>
          выйти
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
