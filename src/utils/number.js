
const BigNumber = require("bignumber.js");

const SUBSCRIPT_NUMBER_MAP = {
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    10: "₁₀",
    11: "₁₁",
    12: "₁₂",
    13: "₁₃",
    14: "₁₄",
    15: "₁₅",
    16: "₁₆",
    17: "₁₇",
    18: "₁₈",
    19: "₁₉",
    20: "₂₀",
    21: "₂₁",
    22: "₂₂",
    23: "₂₃",
    24: "₂₄",
};
// for balance
const calcPrecision = (num) => {
    if (!num) return 8;
  
    switch (true) {
      case Math.abs(+num) < 0.0000000000000000001:
        return 24;
  
      case Math.abs(+num) < 0.000000000000001:
        return 20;
  
      case Math.abs(+num) < 0.00000000001:
        return 16;
  
      case Math.abs(+num) < 0.000000001:
        return 14;
  
      case Math.abs(+num) < 0.0000001:
        return 12;
  
      case Math.abs(+num) < 0.00001:
        return 10;
  
      case Math.abs(+num) < 0.05:
        return 8;
  
      case Math.abs(+num) < 1:
        return 6;
  
      case Math.abs(+num) < 10:
        return 4;
  
      default:
        return 2;
    }
  };
  
const formatNumber = (num, precision, gr0 = true) => {
    if (!num) {
      return num;
    }
  
    if (!precision) {
      precision = calcPrecision(+num);
    }
  
    let formated = new BigNumber(num).toFormat(precision);
  
    if (formated.match(/\.[0]+$/g)) {
      formated = formated.replace(/\.[0]+$/g, "");
    }
  
    if (formated.match(/\.\d+[0]+$/g)) {
      formated = formated.replace(/[0]+$/g, "");
    }
  
    if (gr0 && formated.match(/\.0{4,24}[1-9]+/g)) {
      const match = formated.match(/\.0{4,24}/g);
      const matchString = match[0].slice(1);
      formated = formated.replace(
        /\.0{4,24}/g,
        `.0${SUBSCRIPT_NUMBER_MAP[matchString.length]}`,
      );
    }
  
    return formated;
};
const calcPricePrecision = (num) => {
    if (!num) return 8;
  
    switch (true) {
      case Math.abs(+num) < 0.0000000000000000001:
        return 24;
  
      case Math.abs(+num) < 0.000000000000001:
        return 20;
  
      case Math.abs(+num) < 0.00000000001:
        return 16;
  
      case Math.abs(+num) < 0.000000001:
        return 14;
  
      case Math.abs(+num) < 0.0000001:
        return 12;
  
      case Math.abs(+num) < 0.00001:
        return 10;
  
      case Math.abs(+num) < 0.001:
        return 8;
  
      case Math.abs(+num) < 0.05:
        return 6;
  
      case Math.abs(+num) < 1:
        return 4;
  
      case Math.abs(+num) < 20:
        return 3;
  
      default:
        return 2;
    }
  };
  
const formatPrice = (num, precision, gr0 = true) => {
    if (!num) {
      return num;
    }
  
    if (!precision) {
      precision = calcPricePrecision(+num);
    }
  
    let formated = new BigNumber(num).toFormat(precision);
  
    if (formated.match(/^0\.[0]+$/g)) {
      formated = formated.replace(/\.[0]+$/g, "");
    }
  
    if (gr0 && formated.match(/\.0{4,24}[1-9]+/g)) {
        const match = formated.match(/\.0{4,24}/g);
        if (match && match.length > 0) {
            const matchString = match[0].slice(1);
            if (SUBSCRIPT_NUMBER_MAP[matchString.length]) {
                formated = formated.replace(
                /\.0{4,24}/g,
                `.0${SUBSCRIPT_NUMBER_MAP[matchString.length]}`,
                );
            }
        }
    }
  
    return formated;
};

const abbrNumber = (num) => {
    if (!num) return num;
  
    const numAbs = Math.abs(+num);
    let abbrStr = "";
  
    if (numAbs >= 1000000000) {
      abbrStr = (Math.floor((numAbs * 100) / 1000000000) / 100).toString() + "B";
    } else if (numAbs >= 1000000) {
      abbrStr = (Math.floor((numAbs * 100) / 1000000) / 100).toString() + "M";
    } else if (numAbs >= 1000) {
      abbrStr = (Math.floor((numAbs * 100) / 1000) / 100).toString() + "K";
    } else {
      abbrStr = formatNumber(numAbs)?.toString();
    }
  
    return +num >= 0 ? abbrStr : "-" + abbrStr;
  };

  module.exports = {
    formatNumber,
    formatPrice,
    abbrNumber
  }