import { $authUser } from ".";

export const $getBasket = async () => {
  try {
    const { data } = await $authUser.get("/api/basket/getUsersBasket");
    console.log(data)
    return data
  } catch (error) {
    return error;
  }
};
