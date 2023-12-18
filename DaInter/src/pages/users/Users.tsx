import React, { useState, useEffect } from "react";
import { store1 } from "../../../DB/index";
import ModalEditUser from "../../components/modals/modaledituser/ModalEditUser";
import { userEdit } from "../../interfaces/userEdit";
import Button from "../../components/button/Button";
import Buscador from "../../components/buscador/BuscadorFill";
import style from "./users.module.css";
import Editar from "../../assets/List-icons/Editar";
import { ToastContainer, toast } from "react-toastify";

function Users() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (userData: any) => {
    setSelectedUserData(userData);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserData(null);
  };

  const openDeleteModal = (userData: any) => {
    setUserToDelete(userData);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleEditSave = (editedData: userEdit) => {
    const userId = editedData.key;
    const userIndex = usuarios.findIndex((user) => user.key === userId);

    if (userIndex !== -1) {
      const updatedList = [...usuarios];
      const updatedUser = {
        ...editedData,
        isAuth: usuarios[userIndex].isAuth,
      };

      updatedList[userIndex] = updatedUser;
      setUsuarios(updatedList);
      store1.setItem(userId, updatedUser).then(() => {
        toast.success('Usuario Modificado');
        closeEditModal();
      });
    } else {
      console.error("Usuario no encontrado para editar.");
    }
  };

  useEffect(() => {
    cargarUsuarios();
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
  
      if (usuarioAutenticado) {
        const usuariosOrdenados = usuariosCargados.filter((user) => user !== usuarioAutenticado);
        usuariosOrdenados.unshift(usuarioAutenticado);
        setUsuarios(usuariosOrdenados);
      } else {
        setUsuarios(usuariosCargados);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };
  

  const eliminarUsuario = (key: string | undefined) => {
    if (key) {
      const usuario = usuarios.find((user) => user.key === key);
      if (usuario) {
        openDeleteModal(usuario);
      } else {
        console.error("Usuario no encontrado para eliminar.");
      }
    } else {
      console.error("Clave no válida. No se puede eliminar el usuario.");
    }
  };

  const confirmarEliminacion = async () => {
    try {
      if (userToDelete && userToDelete.key) {
        console.log("Intentando eliminar usuario con clave:", userToDelete.key);
        await store1.removeItem(userToDelete.key);
        toast.info('Usuario Eliminado');
        console.log(
          `Usuario con clave ${userToDelete.key} eliminado correctamente.`
        );
        closeDeleteModal();
        cargarUsuarios();
      } else {
        console.error("Clave no válida. No se puede eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className={`${style["container"]}`}>
      <h2 className={`${style["tittle"]}`}>Lista de Usuarios</h2>
      <div className={`${style["buscador-container"]}`}>
        <Buscador onSearch={handleSearch} />
      </div>
      <div className={`${style["content"]}`}>
        {filteredUsuarios.map((usuario) => (
          <div
          key={usuario.key}
          className={`${style["user-item"]} ${usuario.isAuth ? style["blueUser"] : ""}`}
          id="listuser"
        >
            <div className={`${style["user-details"]}`} id="users">
              {usuario.name} - {usuario.email} ({usuario.role})
            </div>
            <div className={`${style["button-container"]}`}>
              <Button
                name="deleteuser"
                onClick={() => eliminarUsuario(usuario.key)}
                text="Eliminar"
                customStyles={`${style["button-delete"]}`}
              />
              <Button
                name="edituser"
                onClick={() => openEditModal(usuario)}
                text=""
                customStyles={`${style["button-top-edit"]}`}
              >
                <Editar className={`${style["icon-top-edit"]}`} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {editModalOpen && selectedUserData && (
        <ModalEditUser
          userData={selectedUserData}
          onSave={handleEditSave}
          onCancel={closeEditModal}
        />
      )}
      {deleteModalOpen && userToDelete && (
        <div className={`${style["modal"]}`}>
          <div className={`${style["modal-content"]}`}>
            <h1 className={`${style["tittle-modal"]}`}>
              ¿Estás seguro de que quieres eliminar este usuario?
            </h1>
            <Button
              name="cancelmodal"
              onClick={closeDeleteModal}
              text="Cancelar"
              customStyles={`${style["button-modal-cancel"]}`}
            />
            <Button
              name="confirmodal"
              onClick={confirmarEliminacion}
              text="Confirmar"
              customStyles={`${style["button-modal-confirm"]}`}
            />
          </div>
        </div>
      )}
      <ToastContainer className={`${style["toast-container"]}`} />
    </div>
  );
}

export default Users;
