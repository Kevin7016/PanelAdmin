import React, { useEffect, useState } from "react";
const Saludo: React.FC<{ nombre: string }> = ({ nombre }) => {
    const [saludo, setSaludo] = useState("");
  
    useEffect(() => {
      const obtenerSaludo = () => {
        const horaActual = new Date().getHours();
  
        if (horaActual >= 5 && horaActual < 12) {
          setSaludo(`Buenos Días, ${nombre}`);
        } else if (horaActual >= 12 && horaActual < 18) {
          setSaludo(`Buenas Tardes, ${nombre}`);
        } else {
          setSaludo(`Buenas Noches, ${nombre}`);
        }
      };
  
      obtenerSaludo();
    }, [nombre]);
  
    return <p>{saludo}</p>;
  };

  export default Saludo;
