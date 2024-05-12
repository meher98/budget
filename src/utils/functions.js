const { JsonCalendar } = require("json-calendar");
const config = {};
const mt = require("mathjs");
const math = mt.create(mt.all, config);

export const verifWeekInMonth = (w) => {
  for (let e of w) {
    var b = false;
    if (e.className.includes("month-day")) {
      b = true;
      break;
    }
  }
  return b;
};

export const weekParams = (y, m, indexW, w) => {
  if (w && !w[6]?.className.includes("month-day")) {
    if (m === 12) {
      return [y + 1, 1, 0];
    } else {
      return [y, m + 1, 0];
    }
  } else {
    return [y, m, indexW];
  }
};

export const getWeekFromDate = (y, m, d) => {
  const weeks = new JsonCalendar({
    languageCode: "fr",
    monthIndex: m - 1,
    year: y,
  }).weeks;
  var indexW;
  weeks.map((w, wi) =>
    // eslint-disable-next-line array-callback-return
    w.map((e) => {
      if (e.day === d && e.className.includes("month-day")) {
        indexW = wi;
      }
    })
  );
  let week = weekParams(y, m, indexW, weeks[indexW]);
  return `${week[0]}-${week[1]}-${week[2]}`;
};
export const stopScrolling = () => {
  // To get the scroll position of current webpage
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  // if scroll happens, set it to the previous value
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };
};
export const returnScrolling = () => {
  window.onscroll = function () {};
};
export const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const evaluate = (expression) => math.evaluate(expression);
export const convertDate = (date) => {
  let newDate = date.split("/");
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
};
export const dateDiffrence = (date10, date20) => {
  const date1 = new Date(convertDate(date10));
  const date2 = new Date(convertDate(date20));
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const dateToTime = (d) => {
  return new Date(convertDate(d)).getTime();
};
export const timeToDate = (t) => {
  const d = new Date(t);
  return `${d.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${(d.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${d.getFullYear()}`;
};
