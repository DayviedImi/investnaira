import { endOfQuarter, addQuarters, addDays } from "date-fns";
export const fundTypes = {
  1: "Conservative",
  2: "Balanced",
  3: "Aggressive",
};
export const planProgress = (balance, target) => Math.floor((+balance * 100) / +target);

export const sumBalances = (plans, startBalance) => {
  //if total networth start balance is wallet balance else 0,
  // console.log("subBal", plans, startBalance);
  let currentNetworth = startBalance;
  if (plans) {
    Object.keys(plans).map((plan) => {
      let planBal = plans[plan].balance;
      // console.log("adding networth", planBal, startBalance);
      currentNetworth += +planBal;
      return currentNetworth;
    });
  }

  return currentNetworth;
};

export const titleCase = (string) => {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  document.write(sentence.join(" "));
  return sentence;
};

export const convertArrayToObject = (array, key, subObj) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: subObj ? item[subObj] : item,
    };
  }, initialValue);
};

export const updateObjectInArray = (array, action, id = "id") => {
  console.log("id");
  return array.map((item) => {
    if (item[id] !== action[id]) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action,
    };
  });
};

export const fundsDropdown = [
  { id: 1, value: "Conservative", identifier: "fund" },
  { id: 2, value: "Balanced", identifier: "fund" },
  { id: 3, value: "Aggressive", identifier: "fund" },
];

export const frequencyDropdown = [
  {
    id: 1,
    payment_plan: null,
    value: "I'm just making a One-Time payment",
    identifier: "frequency",
  },
  {
    id: 2,
    payment_plan: 2384,
    value: "Save same amount Daily (Automatically)",
    identifier: "frequency",
  },
  {
    id: 3,
    payment_plan: 2385,
    value: "Save same amount Weekly (Automatically)",
    identifier: "frequency",
  },
  {
    id: 4,
    payment_plan: 2386,
    value: "Save same amount Monthly (Automatically)",
    identifier: "frequency",
  },
];

export const maturityDateDropdown = [
  { id: 0, value: "Do not extend", identifier: "maturity_date" },
  { id: 1, value: "3 months", identifier: "maturity_date" },
  { id: 2, value: "6 months", identifier: "maturity_date" },
  { id: 4, value: "1 Year", identifier: "maturity_date" },
  { id: 12, value: "3 Years", identifier: "maturity_date" },
  { id: 20, value: "5 Years", identifier: "maturity_date" },
  { id: 40, value: "10 Years", identifier: "maturity_date" },
];

export const maturityDateDropdownWithDate = [
  {
    id: 1,
    value: `3 months - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 1).toDateString()}`,
    identifier: "maturity_date",
  },
  {
    id: 2,
    value: `6 months - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 2).toDateString()}`,
    identifier: "maturity_date",
  },
  {
    id: 4,
    value: `1 year - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 4).toDateString()}`,
    identifier: "maturity_date",
  },
  {
    id: 12,
    value: `3 years - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 12).toDateString()}`,
    identifier: "maturity_date",
  },
  {
    id: 20,
    value: `5 years - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 20).toDateString()}`,
    identifier: "maturity_date",
  },
  {
    id: 40,
    value: `10 years - ${addQuarters(addDays(endOfQuarter(Date.now()), 2), 40).toDateString()}`,
    identifier: "maturity_date",
  },
];

export const taskLevel = {
  //make this an external helper
  uncompleted: 1,
  unverified: 2,
  completed: 3,
};
