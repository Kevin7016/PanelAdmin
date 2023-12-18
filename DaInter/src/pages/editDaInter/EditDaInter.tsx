import React, { useState, useEffect, useCallback } from "react";
import { store2 } from "../../../DB/index";
import { DaInterPersonalData } from "../../interfaces/daInterPersonalData";
import Button from "../../components/button/Button";
import Buscador from "../../components/buscador/BuscadorFill";
import UploadPdfModal from "../../components/modals/modalUploadpdf/UploadPdf";
import style from "./editDaInter.module.css";
import ModalEdit from "../../components/modals/modaleditDaInter/ModalEdit";
import ConfirmationModal from "../../components/modals/confirmationmodal/ConfirmationModal";
import Editar from "../../assets/List-icons/Editar";
import { ToastContainer, toast } from "react-toastify";

interface EditDaInterProps {
  onBack: () => void;
}

const EditDaInter: React.FC<EditDaInterProps> = (props) => {
  const [uploadPdfModalOpen, setUploadPdfModalOpen] = useState(false);
  const [selectedUserForUpload, setSelectedUserForUpload] =
    useState<DaInterPersonalData | null>(null);

  const [dataList, setDataList] = useState<DaInterPersonalData[]>([]);
  const [filteredDataList, setFilteredDataList] = useState<
    DaInterPersonalData[]
  >([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] =
    useState<DaInterPersonalData | null>(null);

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState<DaInterPersonalData | null>(
    null
  );

  const openDeleteConfirmationModal = (userData: DaInterPersonalData) => {
    setUserToDelete(userData);
    setDeleteConfirmationModalOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setUserToDelete(null);
    setDeleteConfirmationModalOpen(false);
  };

  const handleDeleteConfirmation = () => {
    if (userToDelete) {
      deleteData(userToDelete.id);
      closeDeleteConfirmationModal();
    }
  };

  const openEditModal = (userData: DaInterPersonalData) => {
    setSelectedUserData(userData);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserData(null);
  };

  const openUploadPdfModal = (userData: DaInterPersonalData) => {
    setSelectedUserForUpload(userData);
    setUploadPdfModalOpen(true);
  };

  const closeUploadPdfModal = () => {
    setUploadPdfModalOpen(false);
    setSelectedUserForUpload(null);
  };

  const handleEditSave = async (editedData: DaInterPersonalData) => {
    try {
      const storedData = await store2.getItem(`DaInter-${editedData.id}`);

      if (storedData) {
        await store2.setItem(`DaInter-${editedData.id}`, editedData);

        const updatedList = dataList.map((user) =>
          user.id === editedData.id ? editedData : user
        );

        setDataList(updatedList);
        setFilteredDataList(updatedList);
        toast.success('Cambios guardados')
        closeEditModal();
      } else {
        console.error("No se encontró el usuario para editar.");
      }
    } catch (error) {
      console.error("Error al editar dato:", error);
    }
  };

  const deleteData = async (id: string) => {
    try {
      await store2.removeItem(`DaInter-${id}`);

      const updatedList = dataList.filter((user) => user.id !== id);
      setDataList(updatedList);
      setFilteredDataList(updatedList);

      toast.info('DaInter eliminado correctamente')
      console.log(`Dato con id ${id} eliminado correctamente.`);
    } catch (error) {
      console.error("Error al eliminar dato:", error);
    }
  };

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
          if (data && typeof data === "object") {
            dataListLoaded.push({
              ...data,
              id: key.replace("DaInter-", ""),
            } as DaInterPersonalData);
          }
        }
      }

      setDataList(dataListLoaded);
      setFilteredDataList(dataListLoaded);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filteredUsers = dataList.filter((userData) =>
        `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno} ${userData.email} ${userData.escuela}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredDataList(filteredUsers);
    },
    [dataList, setFilteredDataList]
  );

  const handleFileUpload = async (
    file: File,
    fileType: string,
    userData: DaInterPersonalData
  ) => {
    try {
      const key = `DaInter-${userData.id}`;
      const storedData = (await store2.getItem(key)) as DaInterPersonalData | null;
  
      if (storedData) {
        const updatedData: DaInterPersonalData = {
          ...storedData,
          [fileType]: file,
        };
  
        await store2.setItem(key, updatedData);

        setDataList((prevDataList) =>
          prevDataList.map((user) =>
            user.id === userData.id ? updatedData : user
          )
        );
  
        setFilteredDataList((prevFilteredDataList) =>
          prevFilteredDataList.map((user) =>
            user.id === userData.id ? updatedData : user
          )
        );
        toast.success(`Archivos subidos correctamente`);
        console.log(
          `Archivo ${fileType} subido correctamente para el usuario ${userData.id}`
        );
      }
    } catch (error) {
      console.error(`Error al subir el archivo ${fileType}:`, error);
    }
  };
  

  return (
    <div className={`${style["main-container"]}`}>
      <h2 className={`${style["tittle"]}`}>Panel de Edición</h2>
      <h2 className={`${style["title-list"]}`}>Lista de Datos</h2>
      <div className={`${style["div-container-busq"]}`}>
        <div className={`${style["div-buscador"]}`}>
          <div className={`${style["buscador-container"]}`}>
            <Buscador onSearch={handleSearch} />
          </div>
          <Button
            name="return"
            onClick={props.onBack}
            text="Regresar"
            customStyles={`${style["button-regresar"]}`}
          />
        </div>
      </div>

      <div className={`${style["ul"]}`}>
        {filteredDataList.map((data, index) => (
          <div key={index} className={`${style["li"]}`} id="list">
            <div className={`${style["name"]}`} id="dainteredit">
              {data.nombre} - {data.email}
            </div>
            <div className={`${style["button-container"]}`}>
              <Button
                name="openModalpdf"
                onClick={() => openUploadPdfModal(data)}
                text="Subir PDF"
                customStyles={`${style["button"]}`}
              />

              <Button
                name="openModalEdit"
                onClick={() => openEditModal(data)}
                text=""
                customStyles={`${style["button-top-edit"]}`}
              >
                <Editar className={`${style["icon-top-edit"]}`} />
              </Button>
              <Button
                name="delete"
                onClick={() => openDeleteConfirmationModal(data)}
                text="Eliminar"
                customStyles={`${style["button-delete"]}`}
              />
            </div>
          </div>
        ))}
      </div>
      {editModalOpen && selectedUserData && (
        <ModalEdit
          userData={selectedUserData}
          onSave={handleEditSave}
          onCancel={closeEditModal}
        />
      )}
      {uploadPdfModalOpen && selectedUserForUpload && (
        <UploadPdfModal
        isOpen={uploadPdfModalOpen}
        onClose={closeUploadPdfModal}
        onFileUpload={(file, fileType) =>
          handleFileUpload(file, fileType, selectedUserForUpload)
          }
        />
      )}
      {deleteConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={deleteConfirmationModalOpen}
          onClose={closeDeleteConfirmationModal}
          onConfirm={handleDeleteConfirmation}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar a ${
            userToDelete?.nombre || "este usuario"
          }?`}
        />
      )}
       <ToastContainer className={`${style["toast-container"]}`} />
    </div>
  );
};

export default EditDaInter;
