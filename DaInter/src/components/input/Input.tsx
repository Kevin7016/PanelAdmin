import React, { useEffect, useState } from "react";
import style from "./input.module.css";

const Input = ({
  tipo,
  name = "no",
  customStyles,
  label,
  value,
  onChange,
  required,
  error,
  children,
  message,
  accept,
  placeholder,
  checked,
  resetFileLabel,
}: {
  text?: string;
  name?: string;
  label?: string | boolean;
  customStyles?: string;
  tipo?: "text" | "password" | "email" | "file" | "checkbox";
  value?: string | number | readonly string[] | undefined | string | File | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  error?: boolean;
  children?: React.ReactNode;
  message?: string;
  accept?: string;
  placeholder: string;
  checked?: boolean;
  resetFileLabel?:boolean;
}) => {

  useEffect(() => {
    if (resetFileLabel) {
      setFileLabel("Examinar");
      setShowFileText(true);
    }
  }, [resetFileLabel]);
  
  const [fileLabel, setFileLabel] = useState(value ? "Archivo Seleccionado" : "Examinar");
  const [showFileText, setShowFileText] = useState(true); 

  const inputClassName = error ? style["input-error"] : "";
  const labelClassName = error ? `${style["label"]} ${style["label-error"]}` : style["label"];

  const checkboxStyles = tipo === "checkbox" ? { width: "20px", height: "20px" } : {};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    const fileName = e.target.files?.[0]?.name || "Examinar";
    setFileLabel(fileName);
    setShowFileText(false); 
  }

  return (
    <div className={style["input-container"]}>
      {error && message ? (
        <label className={labelClassName}>
          <span>{message}</span>
        </label>
      ) : (
        label && <label className={labelClassName}>{label}</label>
      )}
      {tipo === "file" ? (
        <div className={style["file-input-container"]}>
          <input
            type={tipo}
            placeholder={placeholder}
            className={`${style["input"]} ${customStyles} ${inputClassName}`}
            value={value as string}
            onChange={handleFileChange}
            name={name}
            id={name}
            required={required}
            accept={accept}
            checked={checked}
            style={checkboxStyles}
          />
          <label htmlFor={name} className={style["custom-button"]}>
            {showFileText ? "Examinar" : fileLabel}
          </label>
          {showFileText && ( 
            <span className={style["custom-span-after"]}>
              Sin archivos seleccionados
            </span>
          )}
        </div>
      ) : (
        <input
          type={tipo}
          placeholder={placeholder}
          className={`${style["input"]} ${customStyles} ${inputClassName}`}
          value={value as string}
          onChange={onChange}
          name={name}
          id={name}
          required={required}
          accept={accept}
          checked={checked}
          style={checkboxStyles}
        />
      )}
      {children}
    </div>
  );
};

export default Input;
