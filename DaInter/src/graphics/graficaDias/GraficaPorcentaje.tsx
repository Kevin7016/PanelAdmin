import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { store2 } from "../../../DB/index";
import { DaInterPersonalData } from "../../interfaces/daInterPersonalData";
import style from "./graficaporcent.module.css";
import "chart.js/auto";

const Dashb: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
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
          if (data && typeof data === "object" && "escuela" in data) {
            const loadedData: DaInterPersonalData = {
              id: key.replace("DaInter-", ""),
              nombre: "",
              escuela: "",
              apellidoPaterno: "",
              apellidoMaterno: "",
              email: "",
              fechaIngreso: "",
            };
            loadedData.escuela = data.escuela as string;

            dataListLoaded.push(loadedData);
          }
        }
      }
      processData(dataListLoaded);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const schoolColors = [
    "#2d30de",
    "#ba2424",
    "#2584c3",
    "#FF4081",
    "#FFD600",
    "#2196F3",
    "#9C27B0",
  ];

  const processData = (dataList: DaInterPersonalData[]) => {
    const usersBySchool: { [key: string]: number } = {};

    dataList.forEach((user) => {
      if (user.escuela in usersBySchool) {
        usersBySchool[user.escuela]++;
      } else {
        usersBySchool[user.escuela] = 1;
      }
    });

    const totalStudents = dataList.length;

    const labels = Object.keys(usersBySchool);
    const dataValues = Object.values(usersBySchool);

    const percentageValues = dataValues.map((value) => Math.round((value / totalStudents) * 100));


    const backgroundColors = labels.map((_, index) => {
      const colorIndex = index % schoolColors.length;
      return schoolColors[colorIndex];
    });

    const chartData = {
      labels,
      datasets: [
        {
          data: percentageValues,
          backgroundColor: backgroundColors,
        },
      ],
    };

    setChartData(chartData);
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className={`${style["container"]}`}>
      <h2 className={`${style["tittle"]}`}>Porcentaje de Estudiantes por Escuela</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Dashb;
