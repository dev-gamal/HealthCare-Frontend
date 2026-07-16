import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import "./addPatient.css";

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
      alert("Patient ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="form-container">
      <h2>Nouveau Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Nom</label>
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

        <button type="submit" className="btn-submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
