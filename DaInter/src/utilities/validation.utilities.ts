import { toast } from "react-toastify";

export const validacionPassword = (password:string) => {
  const passwordCaracter = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
  if (!passwordCaracter.test(password)) {
    return {
      error: true,
      message: "8+ caracteres, mayúscula, número y símbolo."
    };
  }
  return {
    error: false,
    message: ""
  };
};


export const validacionCampo = (campo: string, nombreCampo: string) => {
  if (!campo.trim()) {
    return {
      error: true,
      message: ` *${nombreCampo} obligatorio.`,
    };
  }

  return {
    error: false,
    message: "",
  };
};

export const validacionEmail = (email: string) => {
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailValid.test(email)) {
    return {
    error: true,
    message: "Ingrese un correo electronico valido"
    };
  }
  return {
    error: false,
    message: ""
  };
};

export const verificarCredenciales = (
  email: string,
  password: string,
  usuarios: Record<string, any>[]
) => {
  const usuario = usuarios.find((user) => user.email === email);

  if (!usuario) {
    return "Verifique su usuario y/o Contraseña";
  }
  if (usuario.password !== password || usuario.password === "") {
    return "Verifique su usuario y/o Contraseña";
  }
  return usuario;
};


let toastShown = false;
export const verificarUser = (
  email: string,
  usuarios: Record<string, any>[]
) => {
  const usuario = usuarios.find((user) => user.email === email);

  if (usuario) {
    if (!toastShown) {
      toast.warning('Ese correo ya está registrado.');
      toastShown = true;
      console.log(usuario);
    }
  } else {
    toastShown = false;
  }
  return usuario;
};


export const validarConfirmacionPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return {
    error: true,
    message: "La contraseña no coicide"
    };
  }
  return {
    error: false,
    message: ""
    
  }
};

export const validacionRol = (rol: string) => {
  if (!rol) {
    return {
      error: true,
      message: "Por favor, seleccione un rol"
    };
  }
  return {
    error: false,
    message: ""
  };
};


