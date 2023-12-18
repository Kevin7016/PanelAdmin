import React, { useState, useEffect, ChangeEvent } from "react";
import Input from "../input/Input";
import style from "./buscadorfill.module.css"

interface BuscadorProps {
  onSearch: (searchTerm: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <Input
      name="barra"
      customStyles={`${style["buscador"]}`}
      tipo="text"
      placeholder="Buscar usuario..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default Buscador;
