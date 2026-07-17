import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import "./addPatient.css";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Min 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Min 6 characters"),
    lastName: yup.string().required("Last name is required"),
    firstName: yup.string().required("First name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    birthDate: yup.date().required("Birth date is required"),
  })
  .required();

export default function AddPatient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/patient", data);
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="form-container">
      <h2>New Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Username</label>
          <input {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input {...register("lastName")} />
          <p className="error">{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input {...register("firstName")} />
          <p className="error">{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input {...register("phone")} />
          <p className="error">{errors.phone?.message}</p>
        </div>

        <div className="form-group">
          <label>Birth Date</label>
          <input type="date" {...register("birthDate")} />
          <p className="error">{errors.birthDate?.message}</p>
        </div>

        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}
