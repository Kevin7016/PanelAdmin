import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { store2 } from "../../../DB/index";
import { DaInterPersonalData } from "../../interfaces/daInterPersonalData";
import style from "./graficahrs.module.css"
import "chart.js/auto";

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string;
      borderColor: string;
      label: string;
      fill: boolean;
    }[];
  }>({ labels: [], datasets: [] });

  useEffect(() => {
    loadDataList();
  }, []);

  const loadDataList = async () => {
    try {
      const keys = await store2.keys();
      const dataListLoaded: DaInterPersonalData[] = [];

      for (const key of keys) {
        if (key.startsWith("DaInter-")) {
          const data = await store2.getItem(key);
          if (data && typeof data === "object" && "fechaIngreso" in data) {
            const loadedData: DaInterPersonalData = {
              id: key.replace("DaInter-", ""),
              nombre: "",
              escuela: "",
              apellidoPaterno: "",
              apellidoMaterno: "",
              email: "",
              fechaIngreso: "",
            };
            loadedData.fechaIngreso = data.fechaIngreso as string;

            dataListLoaded.push(loadedData);
          }
        }
      }
      processData(dataListLoaded);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const processData = (dataList: DaInterPersonalData[]) => {
    const usersByHour: { [key: string]: number } = {};

    dataList.forEach((user) => {
      if (user.fechaIngreso && user.fechaIngreso.trim() !== "") {
        const dateParts = user.fechaIngreso.split(" ");
        const timePart = dateParts[1]; 
        const hour = timePart.split(":")[0]; 

        if (hour in usersByHour) {
          usersByHour[hour]++;
        } else {
          usersByHour[hour] = 1;
        }
      }
    });

    const labels = Object.keys(usersByHour);
    const dataValues = Object.values(usersByHour);

    const chartData = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          label: "Horas de Ingreso",
          fill: false,
        },
      ],
    };

    setChartData(chartData);
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Horas del Día",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de Ingresos",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className={`${style["container"]}`}>
      <h2 className={`${style["tittle"]}`}>Horas de ingreso DaInter</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Dashboard;
