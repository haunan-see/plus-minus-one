import CATEGORIES_ACTION_TYPES from "./category.types";
import { createAction } from "../../utilities/reducer/reducer.utilities";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
