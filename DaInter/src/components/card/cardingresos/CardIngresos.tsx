import React, { useEffect, useState } from "react";
import style from "./cardingresos.module.css";
import { DaInterUser } from "../../../interfaces/daInter-interface";
import { store2 } from "../../../../DB";
import Select from "../../select/Select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface IngresosPorDiaCardProps {
  ingresosPorDia: number;
}

interface TotalAlumnosPorDia {
  [key: string]: number;
}

const IngresosPorDiaCard: React.FC<IngresosPorDiaCardProps> = ({
  ingresosPorDia,
}) => {
  const [filtro, setFiltro] = useState<string>("Hoy");
  const [contador, setContador] = useState(0);
  const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);
  const [alumnosObject, setAlumnosObject] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const keys = await store2.keys();
        const alumnosData = await Promise.all(
          keys.map(async (key) => ({ key, data: await store2.getItem(key) }))
        );
        const alumnosObject = alumnosData.reduce((acc, { key, data }) => {
          if (key.startsWith("DaInter-") && data) {
            acc[key] = JSON.stringify(data);
          }
          return acc;
        }, {} as { [key: string]: string });

        const dias = Array.from(
          new Set(
            Object.values(alumnosObject).map((alumnoDataString: string) => {
              const alumnoData: DaInterUser = JSON.parse(alumnoDataString);
              if (alumnoData.fechaIngreso) {
                const fechaIngreso = new Date(alumnoData.fechaIngreso);
                if (!isNaN(fechaIngreso.getTime())) {
                  return format(fechaIngreso, "EEEE", { locale: es }).replace(
                    /^\w/,
                    (c) => c.toUpperCase()
                  );
                }
              }
              return "";
            })
          )
        ).filter(Boolean);

        setDiasDisponibles(dias);
        setAlumnosObject(alumnosObject);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        contador <
        (filtro === "Hoy" ? ingresosPorDia : totalAlumnosPorDia[filtro] || 0)
      ) {
        setContador((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [contador, ingresosPorDia, filtro]);

  const totalAlumnosPorDia: TotalAlumnosPorDia = diasDisponibles.reduce(
    (total, dia) => {
      const alumnosDelDia = Object.values(alumnosObject).filter(
        (alumnoDataString) => {
          const alumnoData: DaInterUser = JSON.parse(alumnoDataString);
          if (alumnoData.fechaIngreso) {
            const fechaIngreso = new Date(alumnoData.fechaIngreso);
            const diaIngreso = format(fechaIngreso, "EEEE", {
              locale: es,
            }).replace(/^\w/, (c) => c.toUpperCase());
            return diaIngreso === dia;
          }
          return false;
        }
      );
      return { ...total, [dia]: alumnosDelDia.length };
    },
    {}
  );

  const handleFiltroChange = (nuevoFiltro: string) => {
    setFiltro(nuevoFiltro);
    setContador(0);
  };

  return (
    <div className={`${style["card"]}`}>
      <h3 className={`${style["tittle"]}`}>Ingresos por Día</h3>
      <Select
        customStyles={`${style["select"]}`}
        selectedValue={filtro}
        defaultOption="Hoy"
        options={["Hoy", ...diasDisponibles]}
        onChange={(e) => handleFiltroChange(e.target.value)}
      />
      <p className={`${style["body"]}`}>{contador}</p>{" "}
    </div>
  );
};

export default IngresosPorDiaCard;
