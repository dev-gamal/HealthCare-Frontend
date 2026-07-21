import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import api from "../../services/api";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: "PATIENT",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "The username must be at least 3 characters long")
      .required("The username is required"),
    email: Yup.string()
      .email("The email format is invalid")
      .required("The email is required"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters long")
      .required("The password is required"),
    roles: Yup.string()
      .oneOf(["PATIENT", "DOCTOR"], "Invalid role")
      .required("The role is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      await api.post("/auth/register", formData);

      navigate("/login", {
        state: { message: "Registration successful. You can now log in." },
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        setServerError(
          err.response.data.message || "An error occurred during registration.",
        );
      } else {
        setServerError("Error connecting to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an account</h2>
        {serverError && (
          <div className="error-message server-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "input-error" : ""}
              placeholder="Ex: gamal_badie"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              placeholder="nom@exemple.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="roles">Role</label>
            <select
              id="roles"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              className={errors.roles ? "input-error" : ""}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
            {errors.roles && <span className="error-text">{errors.roles}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Registration in progress..." : "Register"}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
