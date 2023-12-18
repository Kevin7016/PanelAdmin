import React, { useEffect, useState } from "react";
import style from "./dashboard.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux-slices/authSlice";
import { useNavigate } from "react-router-dom";
import Dashb from "../graphicsboard/GraficDashb";
import Insert from "../../modules/registDaInter/RegistDaInter";
import List from "../../modules/listDaInter/List";
import DaCodes from "../../assets/login-icons/DaCodes";
import Users from "../users/Users";
import Book from "../../assets/dashboar-icons/Book";
import Profile from "../../assets/dashboar-icons/Profile";
import Control from "../../assets/dashboar-icons/Control";
import UsersIcon from "../../assets/dashboar-icons/UsersIcon";
import Button from "../../components/button/Button";
import { store1 } from "../../../DB";
import EditDaInter from "../editDaInter/EditDaInter";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("list");

  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState("mi-dashb");
  const [sectionTitle, setSectionTitle] = useState("Dashboard");
  const [animatedTitle, setAnimatedTitle] = useState("");
  let animationTimeout: number | null | undefined = null;

  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const getAllUsersFromLocalForage = async (): Promise<
        Record<string, any>[]
      > => {
        const userListKeys = await store1.keys();
        const userList = await Promise.all(
          userListKeys.map(async (userKey) => {
            try {
              const userData = await store1.getItem(userKey);
              if (userData) {
                return { key: userKey, ...userData };
              } else {
                return null;
              }
            } catch (error) {
              console.error(
                `Error al obtener datos del usuario con clave ${userKey}: ${error}`
              );
              return null;
            }
          })
        );
        return userList as Record<string, any>[];
      };

      const userList = await getAllUsersFromLocalForage();

      const user = userList.find((user) => user.isAuth);

      if (user) {
        setUserRole(user.role);
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    const getAllUsersFromLocalForage = async (): Promise<
      Record<string, any>[]
    > => {
      const userListKeys = await store1.keys();
      const userList = await Promise.all(
        userListKeys.map(async (userKey) => {
          try {
            const userData = await store1.getItem(userKey);
            if (userData) {
              return { key: userKey, ...userData };
            } else {
              return null;
            }
          } catch (error) {
            console.error(
              `Error al obtener datos del usuario con clave ${userKey}: ${error}`
            );
            return null;
          }
        })
      );
      return userList as Record<string, any>[];
    };

    const userList = await getAllUsersFromLocalForage();

    const authenticatedUser = userList.find((user) => user.isAuth);

    if (authenticatedUser) {
      const updatedUser = {
        ...authenticatedUser,
        isAuth: false,
      };

      await store1.setItem(authenticatedUser.key, updatedUser);
    }
    dispatch(logout());
    navigate("/login");
  };

  const updateSectionTitle = (newTitle: string) => {
    setSectionTitle(newTitle);
  };

  const animateTitle = (text: string, index: number, currentText: string) => {
    if (index < text.length) {
      setTimeout(() => {
        setAnimatedTitle(currentText + text[index]);
        animateTitle(text, index + 1, currentText + text[index]);
      }, 40);
    }
  };

  useEffect(() => {
    setAnimatedTitle("");
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
    animateTitle(sectionTitle, 0, "");
  }, [sectionTitle]);

  const renderSection = () => {
    switch (selectedSection) {
      case "mi-dashb":
        return <Dashb />;
      case "agregar-estudiantes":
        return <Insert />;
      case "mostrar-lista":
        if (currentComponent === "list") {
          return <List setCurrentComponent={setCurrentComponent} />;
        } else if (currentComponent === "deleteList") {
          return <EditDaInter onBack={() => setCurrentComponent("list")} />;
        }
        break;
      case "mostrar-usuarios":
        return <Users />;
      default:
        return <Dashb />;
    }
  };

  return (
    <div className={`${style["dashboard"]}`}>
      <div className={`${style["navbar-dashboard"]}`}>
        <DaCodes className={`${style["dacodes-icon"]}`} />
        <h1 className={`${style["title"]}`}>{animatedTitle}</h1>
        <div>
          <Button
            name="logout"
            onClick={handleLogout}
            text="Logout"
            customStyles={`${style["logout-button"]}`}
          />
        </div>
      </div>
      <div className={`${style["dashboard-content"]}`}>
        <div className={`${style["sidebar"]}`}>
          <div className={`${style["buttons-content"]}`}>
            <div className={`${style["divselect"]}`}>
              <Button
                name="dashboard"
                customStyles={`${style["button"]} ${
                  selectedSection === "mi-dashb"
                    ? style["selected-button"]
                    : style["button"]
                }`}
                text="Dashboard"
                onClick={() => {
                  setSelectedSection("mi-dashb");
                  updateSectionTitle("Dashboard");
                }}
              >
                <Profile
                  className={`${style["icon"]} ${
                    selectedSection === "mi-dashb"
                      ? style["selected-icon"]
                      : style["icon"]
                  }`}
                />
              </Button>
            </div>
            <div className={`${style["divselect"]}`}>
              <Button
                name="agregar-estudiantes"
                customStyles={`${style["button"]} ${
                  selectedSection === "agregar-estudiantes"
                    ? style["selected-button"]
                    : style["button"]
                }`}
                text="Registro DaInter"
                onClick={() => {
                  setSelectedSection("agregar-estudiantes");
                  updateSectionTitle("Registro DaInter");
                }}
              >
                <Control
                  className={`${style["icon"]} ${
                    selectedSection === "agregar-estudiantes"
                      ? style["selected-icon"]
                      : style["icon"]
                  }`}
                />
              </Button>
            </div>
            <div className={`${style["divselect"]}`}>
              <Button
                name="mostrar-lista"
                customStyles={`${style["button"]} ${
                  selectedSection === "mostrar-lista"
                    ? style["selected-button"]
                    : style["button"]
                }`}
                text="DaInters"
                onClick={() => {
                  setSelectedSection("mostrar-lista");
                  updateSectionTitle("DaInters");
                }}
              >
                <Book
                  className={`${style["icon"]} ${
                    selectedSection === "mostrar-lista"
                      ? style["selected-icon"]
                      : style["icon"]
                  }`}
                />
              </Button>
            </div>
            {userRole === "Administrador" && isAuthenticated && (
              <div className={`${style["divselect"]}`}>
                <Button
                  name="mostrar-usuarios"
                  customStyles={`${style["button"]} ${
                    selectedSection === "mostrar-usuarios"
                      ? style["selected-button"]
                      : style["button"]
                  }`}
                  text="Usuarios"
                  onClick={() => {
                    setSelectedSection("mostrar-usuarios");
                    updateSectionTitle("Usuarios");
                  }}
                >
                  <UsersIcon
                    className={`${style["icon"]} ${
                      selectedSection === "mostrar-usuarios"
                        ? style["selected-icon"]
                        : style["icon"]
                    }`}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={`${style["main-content"]}`}>{renderSection()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
