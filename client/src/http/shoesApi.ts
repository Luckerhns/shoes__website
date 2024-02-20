import { AxiosError } from "axios";
import { $admin, $user } from ".";
export const getShoes = async () => {
  const { data } = await $user.get("api/shoes/getAll");
  return data;
};

export const createType = async (type: string) => {
  try {
    const { data } = await $admin.post("api/type/create_type", {
      type: type,
    });
    console.log(data);
    return { data: "Тип создан " + data.type, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: "Ошибка " + error.response.data.message, status: 409 };
  }
};

export const createBrand = async (brand: string) => {
  try {
    const { data } = await $admin.post("api/brand/create_brand", {
      brand: brand,
    });
    console.log(data);
    return { data: "Бренд создан " + data.brand, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: "Ошибка " + error.response.data.message, status: 409 };
  }
};

export const createModel = async (
  type: string,
  brand: string,
  season: string,
  model: string
) => {
  try {
    const { data } = await $admin.post("api/model/create", {
      brand: brand,
      type: type,
      season: season,
      model: model,
    });
    console.log(data);
    return { data: "Модель создана " + data.model, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: "Ошибка " + error.response.data.message, status: 409 };
  }
};

export const createShoes = async (
  shoes:string,
  brand: string,
  type: string,
  model: string,
  season: string,
  price: number
) => {
  try {
    const { data } = await $admin.post("api/shoes/create", {
      shoes: shoes,
      brand: brand,
      type: type,
      model: model,
      season: season,
      price: price,
      size: [],
    });
    console.log(data);
    return { data: "Обувь создана " + data.brand, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: "Ошибка " + error.response.data.message, status: 409 };
  }
};

export const createSeason = async (brand: string) => {
  try {
    const { data } = await $admin.post("api/brand/create_brand", {
      brand: brand,
    });
    console.log(data);
    return { data: "Сезон создан " + data.brand, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: "Ошибка " + error.response.data.message, status: 409 };
  }
};
