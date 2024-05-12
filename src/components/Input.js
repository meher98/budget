import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import "../styles/input.scss";
import Calendar from "./Calendar";
import { NumberInput } from "./NumberInput";

export default function Input({
  className,
  onFocus,
  onBlur,
  icon,
  placeholder,
  error,
  type,
  onChange,
  value,
  date,
  allowChangeMonth,
  ...props
}) {
  const inputRef = useRef();
  const [focusSpan, setFocusSpan] = useState(false);
  const [focus, setFocus] = useState(false);
  const [clickInsideCalender, setClickInsideCalender] = useState(false);
  useEffect(() => {
    setFocusSpan(inputRef?.current?.value !== "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const focusFunction = (event) => {
    setTimeout(() => setFocus(true), 200);
    setFocusSpan(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const blurFucntion = (event) => {
    setTimeout(() => setFocus(false), 200);
    if (event.target.value === "") {
      setFocusSpan(false);
    } else {
      setFocusSpan(true);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const focusInput = () => {
    inputRef?.current?.focus();
  };
  const handleChangeClendar = (y, m, d) => {
    onChange(
      `${d.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${m.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${y}`
    );
    setTimeout(() => setClickInsideCalender(false), 50);
  };
  return (
    <div className="custom-input-error-container">
      {type === "semaine" || type === "mois" ? (
        <>
          <div
            onClick={focusInput}
            onFocus={focusInput}
            className={`custom-input-container ${className ? className : ""} ${
              error ? "custom-input-container-error" : ""
            }`}
          >
            <label>
              <span className={`${focusSpan ? "span-focus" : ""}`}>
                {placeholder}
              </span>
              <input
                ref={inputRef}
                onFocus={(event) => focusFunction(event)}
                onBlur={(event) => blurFucntion(event)}
                className="custom-input"
                type="text"
                inputmode="none"
                value={value}
                autocomplete="off"
                {...props}
              />
            </label>
            <div className="icon-container">
              <BsFillCalendarMinusFill />
            </div>
          </div>
          {(focus || clickInsideCalender) && (
            <ClickAwayListener
              onClickAway={() => setClickInsideCalender(false)}
            >
              <div className="input-calendar-container">
                <Calendar
                  onClick={() => setClickInsideCalender(true)}
                  allowChangeMonth={allowChangeMonth}
                  changeMonthFunc={() => inputRef?.current?.focus()}
                  dayClick={handleChangeClendar}
                  initialMonth={parseInt(date?.split("-")[1]) - 1}
                  initialYear={date?.split("-")[0]}
                  week={
                    date?.split("-")[2] ? parseInt(date?.split("-")[2]) : false
                  }
                  otherMonths={!date ? true : date.split("-")[2] ? true : false}
                />
              </div>
            </ClickAwayListener>
          )}
        </>
      ) : (
        <div
          onClick={focusInput}
          onFocus={focusInput}
          className={`custom-input-container ${className ? className : ""} ${
            error ? "custom-input-container-error" : ""
          }`}
        >
          <label>
            <span className={`${focusSpan ? "span-focus" : ""}`}>
              {placeholder}
            </span>
            {type === "number" ? (
              <NumberInput
                ref={inputRef}
                onFocus={(event) => focusFunction(event)}
                onBlur={(event) => blurFucntion(event)}
                className="custom-input"
                onChange={onChange}
                type="text"
                value={value}
                {...props}
                autocomplete="off"
              />
            ) : (
              <input
                ref={inputRef}
                onFocus={(event) => focusFunction(event)}
                onBlur={(event) => blurFucntion(event)}
                className="custom-input"
                onChange={onChange}
                type={type}
                value={value}
                autocomplete="off"
                {...props}
              />
            )}
          </label>
          <div className="icon-container">{icon}</div>
        </div>
      )}

      {error ? <p className="custom-input-error-msg">{error}</p> : null}
    </div>
  );
}
