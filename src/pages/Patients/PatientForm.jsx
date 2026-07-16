import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Le nom d’utilisateur est requis")
      .min(3, "Min 3 caractères"),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(6, "Min 6 caractères"),
    lastName: yup.string().required("Le nom est requis"),
    firstName: yup.string().required("Le prénom est requis"),
    email: yup.string().email("Email invalide").required("L’email est requis"),
    phone: yup.string().required("Le téléphone est requis"),
    birthDate: yup.date().required("La date de naissance est requise"),
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
        alert("Patient modifié avec succès !");
      } else {
        await api.post("/patient", formattedData);
        alert("Patient ajouté avec succès !");
      }
      onSuccess();
    } catch (error) {
      console.error("Erreur de soumission", error);
      alert(
        error.response?.data?.message ||
          "Une erreur est survenue lors de l'enregistrement.",
      );
    }
  };

  return (
    <div className="form-container">
      <h2>
        {isEditMode ? "Modifier le patient" : "Ajouter un nouveau patient"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input {...register("username")} disabled={isEditMode} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Mot de passe {isEditMode && "(requis pour valider)"}</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Nom de famille</label>
          <input {...register("lastName")} />
          <p className="error">{errors.lastName?.message}</p>
        </div>

        <div className="form-group">
          <label>Prénom</label>
          <input {...register("firstName")} />
          <p className="error">{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input {...register("phone")} />
          <p className="error">{errors.phone?.message}</p>
        </div>

        <div className="form-group">
          <label>Date de naissance</label>
          <input type="date" {...register("birthDate")} />
          <p className="error">{errors.birthDate?.message}</p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sauvegarde..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
