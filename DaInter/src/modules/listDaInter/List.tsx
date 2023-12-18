import React, { useCallback, useEffect, useState } from "react";
import style from "./list.module.css";
import { store2 } from "../../../DB/index";
import Button from "../../components/button/Button";
import Domicilio from "../../assets/List-icons/Domicilio";
import Nacimiento from "../../assets/List-icons/Nacimiento";
import Curp from "../../assets/List-icons/Curp";
import Cv from "../../assets/List-icons/Cv";
import Horario from "../../assets/List-icons/Horario";
import Ine from "../../assets/List-icons/Ine";
import Modal from "../../components/modals/modaldown/ModalDown";
import Buscador from "../../components/buscador/BuscadorFill";
import MassDown from "../../components/modals/modalmasivo/MassDown";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowCheckboxes,
  setSelectedCheckbox,
  resetCheckboxes,
} from "../../redux-slices/checkBoxSlice";
import { RootState } from "../../store";
import Download from "../../assets/List-icons/Download";
import Input from "../../components/input/Input";
import Editar from "../../assets/List-icons/Editar";
import ArrowDown from "../../assets/List-icons/ArrowDown";
import ArrowUp from "../../assets/List-icons/ArrowUp";
import { ToastContainer, toast } from "react-toastify";

type UserFormDataType = Record<string, any>;

interface ListProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
}

const List: React.FC<ListProps> = ({ setCurrentComponent }) => {
  const dispatch = useDispatch();
  const showCheckboxes = useSelector(
    (state: RootState) => state.checkbox.showCheckboxes
  );
  const selectedCheckboxes = useSelector(
    (state: RootState) => state.checkbox.selectedCheckboxes
  );
  
  const [userFormData, setUserFormData] = useState<UserFormDataType[]>([]);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  const [filteredUserFormData, setFilteredUserFormData] = useState<
    UserFormDataType[]
  >([]);

  const [isMassDownloadClicked, setIsMassDownloadClicked] = useState(false);

  const [userIconStates, setUserIconStates] = useState(
    Array(userFormData.length).fill("up")
  );

  useEffect(() => {
    setUserIconStates(Array(userFormData.length).fill("down"));
  }, [userFormData.length]);

  const toggleUserDetails = (filteredIndex: number) => {
    if (!isMassDownloadClicked) {
      const newUserIconStates = [...userIconStates];
      newUserIconStates[filteredIndex] =
        newUserIconStates[filteredIndex] === "down" ? "up" : "down";
      setUserIconStates(newUserIconStates);

      const originalIndex = userFormData.indexOf(
        filteredUserFormData[filteredIndex]
      );

      const updatedUserFormData = [...userFormData];
      updatedUserFormData[originalIndex].open =
        !updatedUserFormData[originalIndex].open;

      const isSelected = selectedUsers.includes(originalIndex);
      setSelectedUsers((prevSelected) =>
        isSelected
          ? prevSelected.filter((selected) => selected !== originalIndex)
          : [...prevSelected, originalIndex]
      );
      if (!showCheckboxes) {
        setSelectedCheckbox({
          index: originalIndex,
          value: !selectedCheckboxes[originalIndex],
        });
      }

      setUserFormData(updatedUserFormData);
    }
  };

  const toggleDocumentDetails = (filteredIndex: number) => {
    const originalIndex = userFormData.indexOf(
      filteredUserFormData[filteredIndex]
    );
    const updatedUserFormData = [...userFormData];
    updatedUserFormData[originalIndex].documentOpen =
      !updatedUserFormData[originalIndex].documentOpen;

    setUserFormData(updatedUserFormData);
  };

  const downloadSelectedDocument = (fileKey: string) => {
    const selectedIndices = Object.keys(selectedCheckboxes)
      .map(Number)
      .filter((index) => selectedCheckboxes[index]);
    selectedIndices.forEach((index) => {
      if (selectedCheckboxes[index]) {
        downloadDocument(fileKey, index);
      }
    });
  };

  const openMassDownloadModal = () => {
    setIsMassDownloadClicked(true);
    setShowCheckboxes(true);
    dispatch(setShowCheckboxes(true));
  };

  const closeMassDownloadModal = () => {
    setIsMassDownloadClicked(false);
    setShowCheckboxes(false);
    setSelectedUsers([]);
    dispatch(resetCheckboxes());
  };

  const openDownloadModal = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedUserIndex(index);
  };

  const closeModal = () => {
    setSelectedUserIndex(null);
  };

  const openPDFInNewTab = (fileKey: string, index: number) => {
    if (userFormData.length > index) {
      const user = userFormData[index];
      if (user[fileKey]) {
        const pdfData = user[fileKey];
        const url = URL.createObjectURL(pdfData);
        const newWindow = window.open(url, "_blank");
        URL.revokeObjectURL(url);
        if (newWindow) {
          toast.success("Archivo abierto con éxito");
        }
      } else {
        toast.error("No existe un archivo para abrir");
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    if (isMassDownloadClicked) {
      dispatch(
        setSelectedCheckbox({ index, value: !selectedCheckboxes[index] })
      );
    }
  };

  const handleDownloadButtonClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();

    if (selectedCheckboxes[index]) {
      setShowCheckboxes(true);
    } else {
      openDownloadModal(e, index);
    }
  };

  const handleCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.stopPropagation();
    handleCheckboxChange(index);
  };

  const downloadDocument = async (fileKey: string, index: number) => {
    try {
      const user = userFormData[index];
      if (user && user[fileKey]) {
        const blob = user[fileKey];

        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `${fileKey}.pdf`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`Descarga de Documento ${fileKey}.pdf exitosa`);
      } else {
        toast.error(`No existe el archivo ${fileKey}`);
        console.error(
          `No se encontró el usuario o el archivo con clave ${fileKey}`
        );
      }
    } catch (error) {
      console.error(`Error en la descarga: ${error}`);
    }
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filteredUsers = userFormData.filter((userData) =>
        `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno} ${userData.email} ${userData.escuela}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUserFormData(filteredUsers);
    },
    [userFormData, setFilteredUserFormData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userKeys = await store2.keys();
        const userFormDataArray = (await Promise.all(
          userKeys.map((key) => store2.getItem(key))
        )) as UserFormDataType[];

        const initialDocumentUploadedState: Record<string, boolean> = {
          actaNacimiento: false,
          ine: false,
          comprobanteDomicilio: false,
          curp: false,
          cv: false,
          hr: false,
        };

        const userFormDataWithOpenProperty = userFormDataArray.map((user) => {
          const documentUploaded: Record<string, boolean> = {};
          Object.keys(initialDocumentUploadedState).forEach((documentKey) => {
            documentUploaded[documentKey] = !!user[documentKey];
          });

          return {
            ...user,
            open: false,
            documentOpen: false,
            documentUploaded,
          };
        });

        setUserFormData(userFormDataWithOpenProperty);
      } catch (error) {
        console.error("Error al recuperar los datos de los usuarios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${style["content"]}`}>
      <h1 className={`${style["tittle"]}`}>Lista</h1>
      <div>
        <h1 className={`${style["title-list"]}`}>DaInters</h1>
        <div className={`${style["container-cab"]}`}>
          <div className={`${style["div-buscador"]}`}>
            <Buscador onSearch={handleSearch} />
          </div>
          <div className={`${style["div-buttons"]}`}>
            <Button
              name="masivo"
              onClick={openMassDownloadModal}
              text="Descarga masiva"
              customStyles={`${style["button-top"]}`}
            >
              <Download className={`${style["icon-top"]}`} />
            </Button>
            <Button
              name="edit"
              onClick={() => setCurrentComponent("deleteList")}
              text=""
              customStyles={`${style["button-top-edit"]}`}
            >
              <Editar className={`${style["icon-top-edit"]}`} />
            </Button>
          </div>
        </div>
        {showCheckboxes && (
          <MassDown
            users={selectedUsers.map((index) => userFormData[index])}
            onClose={closeMassDownloadModal}
            user={""}
            downloadDocument={downloadSelectedDocument}
          />
        )}
        <div className={`${style["user-list"]}`}>
          {(filteredUserFormData.length > 0
            ? filteredUserFormData
            : userFormData
          )
            .filter((userData) => userData.nombre)
            .map((userData, index) => (
              <div
                id="toggleUser"
                key={index}
                className={`${style["user-item"]} ${
                  userData.open ? style["open"] : ""
                }`}
                onClick={() => toggleUserDetails(index)}
              >
                <div className={`${style["items-content"]}`}>
                  <p className={`${style["user-text"]}`} id="dainter">
                    {userData.nombre} {userData.apellidoPaterno}{" "}
                    {userData.apellidoMaterno}
                  </p>

                  <div className={`${style["div-checkbutton"]}`}>
                    {userIconStates[index] === "down" && (
                      <ArrowDown className={`${style["icon-arrow"]}`} />
                    )}
                    {userIconStates[index] === "up" && (
                      <ArrowUp className={`${style["icon-arrow"]}`} />
                    )}
                    {showCheckboxes && (
                      <>
                        <Input
                          name="checkbox"
                          customStyles={`${style["checkbox"]}`}
                          placeholder=""
                          tipo="checkbox"
                          checked={selectedCheckboxes[index] || false}
                          onChange={(e) => handleCheckboxClick(e, index)}
                        />
                      </>
                    )}

                    <Button
                      name="dowloadtoggle"
                      customStyles={`${style["button-download"]}`}
                      onClick={(e) => handleDownloadButtonClick(e, index)}
                      text=""
                    >
                      <Download className={`${style["icon-download"]}`} />
                    </Button>
                  </div>
                </div>

                {userData.open && (
                  <div>
                    <table className={`${style["table"]}`}>
                      <thead>
                        <tr>
                          <th>Correo</th>
                          <th>Escuela</th>
                          <th>Documentos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userData.email}</td>
                          <td>{userData.escuela}</td>
                          <td
                            className={`${style["document-cell"]} ${
                              userData.documentOpen
                                ? style["document-cell-open"]
                                : ""
                            }`}
                          >
                            <div className={`${style["fixed"]}`}>
                              <div className={`${style["menu"]}`}>
                                <Button
                                  name="buttonToggle"
                                  text=""
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDocumentDetails(index);
                                  }}
                                  customStyles={`${style["menu-open-button"]} ${
                                    userData.documentOpen ? style["open"] : ""
                                  }`}
                                >
                                  <span>
                                    {userData.documentOpen ? "✕" : "☰"}
                                  </span>
                                </Button>
                                {userData.documentOpen && (
                                  <div>
                                    <div>
                                      <Button
                                        name="actaNacimiento"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab(
                                            "actaNacimiento",
                                            index
                                          )
                                        }}
                                        customStyles={`${
                                          style["button-nacimiento"]
                                        } ${
                                          userData.documentUploaded
                                            .actaNacimiento
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Nacimiento
                                          className={`${style["nacimiento-icon"]}`}
                                        />
                                      </Button>
                                      <Button
                                        name="ine"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab("ine", index)
                                        }}
                                        customStyles={`${style["button-ine"]} ${
                                          userData.documentUploaded.ine
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Ine
                                          className={`${style["ine-icon"]}`}
                                        />
                                      </Button>
                                      <Button
                                        name="comprobanteDomicilio"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab(
                                            "comprobanteDomicilio",
                                            index
                                          )
                                        }}
                                        customStyles={`${
                                          style["button-domicilio"]
                                        } ${
                                          userData.documentUploaded
                                            .comprobanteDomicilio
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Domicilio
                                          className={`${style["domicilio-icon"]}`}
                                        />
                                      </Button>
                                      <Button
                                        name="curp"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab("curp", index)
                                        }}
                                        customStyles={`${
                                          style["button-curp"]
                                        } ${
                                          userData.documentUploaded.curp
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Curp
                                          className={`${style["curp-icon"]}`}
                                        />
                                      </Button>
                                      <Button
                                        name="cv"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab("cv", index)
                                        }}
                                        customStyles={`${style["button-cv"]} ${
                                          userData.documentUploaded.cv
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Cv className={`${style["cv-icon"]}`} />
                                      </Button>
                                      <Button
                                        name="hr"
                                        text=""
                                        onClick={(e) =>{
                                          e.stopPropagation();
                                          openPDFInNewTab("hr", index)
                                        }}
                                        customStyles={`${
                                          style["button-horario"]
                                        } ${
                                          userData.documentUploaded.hr
                                            ? style["document-uploaded"]
                                            : style["document-not-uploaded"]
                                        }`}
                                      >
                                        <Horario
                                          className={`${style["horario-icon"]}`}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {selectedUserIndex !== null && (
        <Modal
          onClose={closeModal}
          downloadDocument={(fileKey: string) =>
            downloadDocument(fileKey, selectedUserIndex)
          }
          user={
            userFormData[selectedUserIndex]
              ? `${userFormData[selectedUserIndex]?.nombre} ${userFormData[selectedUserIndex]?.apellidoPaterno}`
              : ""
          }
        />
      )}
      <ToastContainer className={`${style["toast-container"]}`} />
    </div>
  );
};

export default List;
