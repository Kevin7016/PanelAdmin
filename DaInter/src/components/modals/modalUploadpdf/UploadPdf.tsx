import React, { useState, useCallback} from "react";
import style from "./uploadpdf.module.css";
import Input from "../../input/Input";
import Button from "../../button/Button";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File, fileType: string) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
}) => {
  const [selectedActaNacimiento, setSelectedActaNacimiento] = useState<FileList | null>(null);
  const [selectedINE, setSelectedINE] = useState<FileList | null>(null);
  const [selectedComprobanteDomicilio, setSelectedComprobanteDomicilio] = useState<FileList | null>(null);
  const [selectedCURP, setSelectedCURP] = useState<FileList | null>(null);
  const [selectedCV, setSelectedCV] = useState<FileList | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<FileList | null>(null);

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const { files } = e.target;
    if (files) {
      switch (fileType) {
        case "actaNacimiento":
          setSelectedActaNacimiento(files);
          break;
        case "ine":
          setSelectedINE(files);
          break;
        case "comprobanteDomicilio":
          setSelectedComprobanteDomicilio(files);
          break;
        case "curp":
          setSelectedCURP(files);
          break;
        case "cv":
          setSelectedCV(files);
          break;
        case "hr":
          setSelectedHorario(files);
          break;
        default:
          break;
      }
    }
  };
  

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
  
      const uploadFiles = async (files: FileList | null, fileType: string) => {
        if (files) {
          const fileArray = Array.from(files);
          const uploadPromises = fileArray.map((file) => onFileUpload(file, fileType));
          await Promise.all(uploadPromises);
        }
      };
  
      await uploadFiles(selectedActaNacimiento, "actaNacimiento");
      await uploadFiles(selectedINE, "ine");
      await uploadFiles(selectedComprobanteDomicilio, "comprobanteDomicilio");
      await uploadFiles(selectedCURP, "curp");
      await uploadFiles(selectedCV, "cv");
      await uploadFiles(selectedHorario, "hr");
  
      setSelectedActaNacimiento(null);
      setSelectedINE(null);
      setSelectedComprobanteDomicilio(null);
      setSelectedCURP(null);
      setSelectedCV(null);
      setSelectedHorario(null);
      onClose();
    },
    [
      onFileUpload,
      selectedActaNacimiento,
      selectedINE,
      selectedComprobanteDomicilio,
      selectedCURP,
      selectedCV,
      selectedHorario,
      onClose
    ]
  );
  

  return (
    <div className={isOpen ? style["modal"] : style["modal-hidden"]}>
      <div className={`${style["modal-content"]}`}>
        <h2 className={`${style["tittle"]}`}>Subir Documentos</h2>
        <form className={`${style["form"]}`}>
          <div className={`${style["container-input"]}`}>
            <Input
              customStyles={`${style["input"]}`}
              label="Acta de Nacimiento"
              tipo="file"
              name="actaNacimiento"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "actaNacimiento")}
            />

            <Input
              customStyles={`${style["input"]}`}
              label="INE"
              tipo="file"
              name="ine"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "ine")}
            />

            <Input
              customStyles={`${style["input"]}`}
              label="Comprobante de Domicilio"
              tipo="file"
              name="comprobanteDomicilio"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "comprobanteDomicilio")}
            />

            <Input
              customStyles={`${style["input"]}`}
              label="CURP"
              tipo="file"
              name="curp"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "curp")}
            />

            <Input
              customStyles={`${style["input"]}`}
              label="CV"
              tipo="file"
              name="cv"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "cv")}
            />

            <Input
              customStyles={`${style["input"]}`}
              label="Horario"
              tipo="file"
              name="horario"
              placeholder=""
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "hr")}
            />
          </div>
          <div>
            <Button
              name="cancel"
              customStyles={`${style["button-cancelar"]}`}
              onClick={onClose}
              text="Cancelar"
            />

            <Button
              type="submit"
              text="Subir"
              onClick={handleSubmit}
              customStyles={`${style["button-subir"]}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
