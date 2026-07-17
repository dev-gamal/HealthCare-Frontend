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
    lastName: yup.string().required("Last name is required"),
    firstName: yup.string().required("First name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    birthDate: yup.date().required("Birth date is required"),
  })
  .required();

export default function PatientForm({ patient, onSuccess, onCancel }) {
  const isEditMode = !!patient;

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
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      birthDate: "",
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        username: patient.username || "",
        password: "password123",
        lastName: patient.lastName || "",
        firstName: patient.firstName || "",
        email: patient.email || "",
        phone: patient.phone || "",
        birthDate: patient.birthDate ? patient.birthDate.split("T")[0] : "",
      });
    }
  }, [patient, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString().split("T")[0],
      };

      if (isEditMode) {
        await api.put(`/patient/${patient.id}`, formattedData);
        alert("Patient modified successfully!");
      } else {
        await api.post("/patient", formattedData);
        alert("Patient added successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while saving the patient.",
      );
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Modify Patient" : "Add New Patient"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Username</label>
          <input {...register("username")} disabled={isEditMode} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Password {isEditMode && "(required to save)"}</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input {...register("lastName")} />
          <p className="error">{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <label>First Name </label>
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
