import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Le nom d'utilisateur est requis")
      .min(3, "Min 3 caractères"),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(6, "Min 6 caractères"),
    name: yup.string().required("Le nom du médecin est requis"),
    specialty: yup.string().required("La spécialité est requise"),
    email: yup
      .string()
      .email("Format d'email invalide")
      .required("L'email est requis"),
    phone: yup.string().required("Le numéro de téléphone est requis"),
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
        alert("Médecin modifié avec succès !");
      } else {
        await api.post("/doctor", data);
        alert("Médecin ajouté avec succès !");
      }
      onSuccess();
    } catch (error) {
      console.error("Erreur de soumission", error);
      alert(
        error.response?.data?.message || "Erreur lors de l'enregistrement.",
      );
    }
  };

  return (
    <div className="form-container">
      <h2>
        {isEditMode ? "Modifier le médecin" : "Ajouter un nouveau médecin"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input {...register("username")} disabled={isEditMode} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>
            Mot de passe {isEditMode && "(Requis pour valider la modification)"}
          </label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Nom Complet (Dr. X)</label>
          <input {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Spécialité (ex: Cardiologue)</label>
          <input {...register("specialty")} />
          <p className="error">{errors.specialty?.message}</p>
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
