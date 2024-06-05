import { FORM_FIELD_TYPE, FORM_TYPE } from "./constants";

export const buildPrompt = (text) => {
  return `${text}. Instruction: Give me names only, Give me all results in json format only and Don't send notes. Please follow this instructions`;
};

export const buildFormConfig = (type) => {
  if (type === FORM_TYPE.signIn) {
    return [
      { id: FORM_FIELD_TYPE.email, label: "Email" },
      { id: FORM_FIELD_TYPE.password, label: "Password" },
    ];
  } else {
    return [
      { id: FORM_FIELD_TYPE.name, label: "Full Name" },
      { id: FORM_FIELD_TYPE.email, label: "Email" },
      { id: FORM_FIELD_TYPE.password, label: "Password" },
    ];
  }
};

export const removeDuplicateAssetsFromList = (arr) => {
  const uniqueAssets = {};

  arr.forEach((i) => {
    uniqueAssets[i.id] = i;
  });

  const arrayWithUniqueItems = [];

  for (let item in uniqueAssets) {
    arrayWithUniqueItems.push(uniqueAssets[item]);
  }

  return arrayWithUniqueItems;
};
