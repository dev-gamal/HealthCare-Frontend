import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import ErrorDisplay from '../../components/Errors/ErrorDisplay';
import "./login.css";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [errorData, setErrorData] = useState({ code: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setErrorData({ code: null, message: "" });

    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login", error);
    
      if (error.response) {
        setErrorData({
          code: error.response.status,
          message: error.response.data?.message || "Incorrect credentials. Please try again."
        });
      } else {
        setErrorData({
          code: 503,
          message: "An error occurred while connecting to the server."
        });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">HealthCare+</h2>
        <p className="login-subtitle">Connect to your space</p>

        <ErrorDisplay statusCode={errorData.code} message={errorData.message} />

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
            />
            <p className="field-error">{errors.username?.message}</p>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            <p className="field-error">{errors.password?.message}</p>
          </div>

          <button type="submit" className="btn-login">
            Connect
          </button>
        </form>

        <div className="login-footer">
          <p>
            No account yet ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}