import React from "react";

export default function sortDropdown({
  tag,
  label,
  valuesArr,
  set,
  defaultState,
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
        onChange={(e) => set(e.target.value)}
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
