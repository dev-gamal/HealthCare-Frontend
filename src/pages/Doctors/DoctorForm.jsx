import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

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
    name: yup.string().required("Name is required"),
    specialty: yup.string().required("Specialty is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.string().required("Phone number is required"),
  })
  .required();

export default function DoctorForm({ doctor, onSuccess, onCancel }) {
  const isEditMode = !!doctor;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      specialty: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (doctor) {
      reset({
        username: doctor.username || "",
        password: "password123",
        name: doctor.name || "",
        specialty: doctor.specialty || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
      });
    }
  }, [doctor, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.put(`/doctor/${doctor.id}`, data);
        alert("Doctor updated successfully!");
      } else {
        await api.post("/doctor", data);
        alert("Doctor added successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Submission error", error);
      alert(error.response?.data?.message || "Error occurred while saving.");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Modify Doctor" : "Add New Doctor"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Username</label>
          <input {...register("username")} disabled={isEditMode} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>
            Password {isEditMode && "(Required to validate the modification)"}
          </label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Full Name (Dr. X)</label>
          <input {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Specialty (e.g., Cardiologist)</label>
          <input {...register("specialty")} />
          <p className="error">{errors.specialty?.message}</p>
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

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
