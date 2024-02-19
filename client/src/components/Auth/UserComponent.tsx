import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "../../styles/UserPage/UserComponent.module.scss";
import image from "../../assets/image.png";
import ReactFlagsSelect from "react-flags-select/build/components/ReactFlagsSelect";
import PhoneInput from "../UI/PhoneInput";
import InputField from "../UI/InputField";
import { Navigate, useNavigate } from "react-router-dom";
import { checkEmail } from "../Functions/CheckEmail";
import { logout } from "../Functions/AuthFunctions";

const UserComponent = ({ userData }: any) => {
  const [phone, setPhone] = useState();
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [partonymic, setPatronymic] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const navigate = useNavigate();
  const { error } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    try {
      const isValidEmail = checkEmail(email);
      isValidEmail ? setIsCorrectEmail(true) : setIsCorrectEmail(false);
      const user = localStorage.getItem("user");
      console.log(userData);
      if (!user) {
        console.log("ERROR");
      }
    } catch (err) {
      console.log(error, "ERROR");
    }
  }, [email]);

  return (
    <div className={styles.grid__container}>
      <div className={styles.page__title}>Личные данные</div>
      <div className={styles.user__card}>
        <div className={styles.user__info}>
          <InputField
            type="Имя"
            value={firstname}
            onChange={(e: any) => setFirstname(e.target.value)}
          />
          <InputField
            type="Фамилия"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputField
            type="Отчество"
            value={partonymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
          <div className={`${styles.birthday__dto} ${styles.dto}`}>
            <span>День рождения</span>
            <div className={styles.birthday}>
              <input type="number" />
              <input type="date" />
              <input type="number" />
            </div>
          </div>
          <div className={`${styles.dto__gender} ${styles.dto}`}>
            <span>Пол</span>
            <div className={styles.gender}>
              <div className={`${styles.gender__women} ${styles.gender__type}`}>
                <input type="radio" name="gender" id="female" />
                <label htmlFor="female">Женский</label>
              </div>
              <div className={`${styles.gender__man} ${styles.gender__type}`}>
                <input type="radio" name="gender" id="male" />
                <label htmlFor="male">Мужской</label>
              </div>
            </div>
          </div>
          <div className={styles.number__dto}>
            <span>Номер телефона</span>
            <PhoneInput state={phone} setState={setPhone} />
          </div>
          <InputField
            inputType="email"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span
            style={{
              opacity: isCorrectEmail ? 0 : 1,
              transition: "all 0.3s ease",
              color: "red",
            }}
          >
            Некорректный емайл
          </span>
          <div className={styles.btn__container}>
            <div className={styles.save__btn}>Сохранить</div>
          </div>
        </div>
        <div className={styles.user__image}>
          <img src={image} />
          <div className={styles.exit__btn} onClick={() => logout()}>
            выйти
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
