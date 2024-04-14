import userMenu from "../../helpers/data/user-menu.json";

export const getUserMenu = (role) => {
  if (!userMenu || !role) return []; //userMenu ya da role yoksa boş dizi döndürür
  const menu = userMenu[role.toLowerCase()];
  return menu;
};
