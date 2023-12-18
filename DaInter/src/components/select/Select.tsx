import React, { useState } from "react";
import style from "./select.module.css";

const Select = ({
  label,
  selectedValue,
  onChange,
  customStyles,
  required,
  options,
  error,
  message,
  defaultOption,
  nombre,
}: {
  label?: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  customStyles?: string;
  required?: boolean;
  options: string[];
  error?: boolean;
  message?: string;
  defaultOption: string; 
  nombre?:string;
}) => {

  const [selectedColor, setSelectedColor] = useState("#A09E9E");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor("#000000"); 
    onChange(event);
  };

  const selectClassName = error ? `${style["select"]} ${style["select-error"]}` : `${style["select"]}`;
  
  return (
    <div className={style["select-container"]}>
      {error && message ? (
        <label className={`${style["label"]} ${style["label-error"]}`}>
          <span>{message}</span>
        </label>
      ) : (
        label && <label className={style["label"]}>{label}</label>
      )}
        <select
          name={nombre}
          className={`${selectClassName} ${customStyles}`}
          value={selectedValue}
          onChange={handleSelectChange}
          required={required}
          style={{color: selectedColor}}
        >
          <option value="" disabled hidden>
            {defaultOption}
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      
    </div>
  );
};

export default Select;
