import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import "./login.css";

const schema = yup
  .object({
    username: yup.string().required("Le nom d'utilisateur est requis"),
    password: yup.string().required("Le mot de passe est requis"),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoginError("");

    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion", error);
      if (error.response && error.response.status === 401) {
        setLoginError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        setLoginError(
          "Une erreur est survenue lors de la connexion au serveur.",
        );
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">HealthCare+</h2>
        <p className="login-subtitle">Connectez-vous à votre espace</p>

        {loginError && <div className="api-error">{loginError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Saisissez votre nom d'utilisateur"
            />
            <p className="field-error">{errors.username?.message}</p>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Saisissez votre mot de passe"
            />
            <p className="field-error">{errors.password?.message}</p>
          </div>

          <button type="submit" className="btn-login">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
