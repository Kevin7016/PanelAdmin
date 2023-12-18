import React, { useEffect, useState } from "react";
import style from "./cardalumnos.module.css";

const TotalAlumnosCard: React.FC<{ totalAlumnos: number }> = ({ totalAlumnos }) => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (contador < totalAlumnos) {
        setContador((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [contador, totalAlumnos]);

  return (
    <div className={`${style["card"]}`}>
      <h3 className={`${style["tittle"]}`}>Total de DaInter</h3>
      <p className={`${style["body"]}`}>{contador}</p>
    </div>
  );
};

export default TotalAlumnosCard;
