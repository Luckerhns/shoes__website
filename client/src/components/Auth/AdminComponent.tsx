import React, { useState } from "react";
import styles from "../../styles/UserPage/AdminComponent.module.scss";
import { logout } from "../Functions/AuthFunctions";
import { createBrand, createModel, createSeason, createShoes, createType } from "../../http/shoesApi";

const AdminComponent = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [season, setSeason] = useState("");
  
  const [model, setModel] = useState("");
  const [modelBrand, setModelBrand] = useState("");
  const [modelType, setModelType] = useState("");
  const [modelSeason, setModelSeason] = useState("");

  const [shoes, setShoes] = useState("");
  const [shoesModel, setShoesModel] = useState("");
  const [shoesBrand, setShoesBrand] = useState("");
  const [shoesType, setShoesType] = useState("");
  const [shoesSeason, setShoesSeason] = useState("");
  const [shoesSize, setShoesSize] = useState("");
  const [shoesPrice, setShoesPrice] = useState("");
  
  
  const [seasonError, setSeasonError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [brandError, setBrandError] = useState("")
  const [modelError, setModelError] = useState("");
  const [shoesError, setShoesError] = useState("");

  return (
    <div className={styles.admin__page__container}>
      <div className={styles.admin__container}>
        <div className={styles.admin__panel}>
          <div className={styles.create__type}>
            <input type="text" value={type} onChange={e => setType(e.target.value)} />
            <div onClick={() => createType(type).then(res => setTypeError(res.data))}>Создать тип</div>
            <div>{typeError}</div>
          </div>
          <div className={styles.create__brand}>
            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} />
            <div onClick={() => createBrand(brand).then(res => setBrandError(res.data))}>Создать бренд</div>
            <div>{brandError}</div>
          </div>
          <div className={styles.create__shoes}>
            {/* @ts-ignore */}
            <input type="text" value={season} onChange={e => setSeason(e.target.value)} />
            <div onClick={() => createSeason(season)}>Создать сезон</div>
          </div>
          <div className={styles.create__model}>
            <input type="text" placeholder="Введите модель" value={model} onChange={e => setModel(e.target.value)} />
            <input type="text" placeholder="Введите бренд" value={modelBrand} onChange={e => setModelBrand(e.target.value)} />
            <input type="text" placeholder="Введите тип" value={modelType} onChange={e => setModelType(e.target.value)} />
            <input type="text" placeholder="" value="лето" disabled onChange={e => setModelSeason(e.target.value)} />
            <div onClick={() => createModel(modelType, modelBrand, modelSeason, model).then(res => setModelError(res.data))}>Создать модель</div>
            <div>{modelError}</div>
          </div>
          <div className={styles.create__shoes}>
            <input type="text" placeholder="Введите название обуви" value={shoes} onChange={e => setShoes(e.target.value)} />
            <input type="text" placeholder="Введите бренд" value={shoesBrand} onChange={e => setShoesBrand(e.target.value)} />
            <input type="text" placeholder="Введите тип" value={shoesType} onChange={e => setShoesType(e.target.value)} />
            <input type="text" placeholder="Введите сезон" value={shoesSeason} onChange={e => setShoesSeason(e.target.value)} />
            <input type="text" placeholder="Введите размерную линейку" value={shoesSize} onChange={e => setShoesSize(e.target.value)} />
            <input type="text" placeholder="Введите модель" value={shoesModel} onChange={e => setShoesModel(e.target.value)} />
            <input type="number" placeholder="Введите цену" value={shoesPrice} onChange={e => setShoesPrice(e.target.value)} />
            <div onClick={() => createShoes(shoes, shoesBrand, shoesType, shoesModel, shoesSeason, Number(shoesPrice)).then(res => setShoesError(res.data))}>Создать обувь</div>
            <div>{shoesError}</div>
          </div>
        </div>
        <div className={styles.exit__btn} onClick={() => logout()}>
          выйти
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
