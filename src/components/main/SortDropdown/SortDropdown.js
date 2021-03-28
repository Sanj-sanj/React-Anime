import React from "react";
import "./sortDropdown.css";

export default function SortDropdown({
  tag,
  label,
  valuesArr,
  set,
  defaultState,
  fetchData,
}) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={`sort-${tag}`}>
          {label}:
        </label>
      </div>
      <select
        className="custom-select"
        name="sort-by"
        id={`sort-${tag}`}
        onChange={(e) => {
          set(e.target.value);
          fetchData?.();
        }}
        onBlur={(e) => set(e.target.value)}
        value={defaultState}
      >
        {valuesArr.map((value) => {
          return (
            <option value={value.toLowerCase()} key={value.toLowerCase()}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
