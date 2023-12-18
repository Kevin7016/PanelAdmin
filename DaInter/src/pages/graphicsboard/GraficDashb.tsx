import React, { useEffect, useState } from "react";
import GraficaBarra from "../../graphics/graficaEscuelas/GraficaEscuelas";
import GraficaPie from "../../graphics/graficaDias/GraficaPorcentaje";
import GraficaLine from "../../graphics/graficaHrs/GraficaHrs"
import style from "./graficdashb.module.css";
import { store1, store2} from '../../../DB/index';
import { DaInterUser } from "../../interfaces/daInter-interface";
import Saludo from "../../components/saludo/Saludo";
import TotalAlumnosCard from "../../components/card/cardalumnos/CardAlumnos";
import IngresosPorDiaCard from "../../components/card/cardingresos/CardIngresos";

const Dashb: React.FC = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<any | null>(null);
  const [totalAlumnos, setTotalAlumnos] = useState<number>(0);
  const [ingresosPorDia, setIngresosPorDia] = useState<number>(0);

  useEffect(() => {
    cargarUsuarios();
    cargarDatos();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const keys = await store1.keys();
      const usuariosCargados: any[] = [];

      for (const key of keys) {
        if (key.startsWith("user-")) {
          const user = await store1.getItem(key);
          if (user && typeof user === "object") {
            usuariosCargados.push({ key, ...user });
          }
        }
      }

      const usuarioAutenticado = usuariosCargados.find((user) => user.isAuth);
      setUsuarioAutenticado(usuarioAutenticado);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  
const cargarDatos = async () => {
  try {
    const keys = await store2.keys();
    const alumnos = keys.filter((key) => key.startsWith("DaInter-"));
    setTotalAlumnos(alumnos.length);

    const ingresosHoy = await Promise.all(
      alumnos.map(async (key) => {
        try {
          const item: DaInterUser | null = await store2.getItem(key);
          if (item && typeof item === "object" && item.fechaIngreso) {
            const fechaIngreso = new Date(item.fechaIngreso);
            return esHoy(fechaIngreso) ? key : null;
          }
        } catch (error) {
          console.error("Error al obtener item:", error);
        }
        return null;
      })
    );

    setIngresosPorDia(ingresosHoy.filter(Boolean).length);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};
  

  const esHoy = (fecha: Date): boolean => {
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  };

  return (
    <div className={`${style["container"]}`}>
    <div className={`${style["welcome"]}`}>
      {usuarioAutenticado && <Saludo nombre={usuarioAutenticado.name} />}
    </div>
    <div className={`${style["cards-container"]}`}>
      <TotalAlumnosCard totalAlumnos={totalAlumnos} />
      <IngresosPorDiaCard ingresosPorDia={ingresosPorDia} />
      <div className={`${style["grafic-line"]}`}>
      <GraficaLine/>
    </div>
    </div>

    <div className={`${style["tables-container"]}`}>
      <div className={`${style["grafic-days"]}`}>
        <GraficaPie />
      </div>
      <div className={`${style["grafic-school"]}`}>
        <GraficaBarra />
      </div>
    </div>
  </div>
  
  );
};

export default Dashb;