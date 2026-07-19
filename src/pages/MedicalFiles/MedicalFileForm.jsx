import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

const schema = yup.object({
  patientId: yup.number().typeError("Patient ID must be a number").required("Required"),
  diagnosis: yup.string().required("Diagnosis is required"),
  observation: yup.string().required("Observation is required"),
}).required();

export default function MedicalFileForm({ medicalFile, onSuccess, onCancel }) {
  const isEditMode = !!medicalFile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      patientId: "", diagnosis: "", observation: "",
    },
  });

  useEffect(() => {
    if (medicalFile) {
      reset({
        patientId: medicalFile.patientId || "",
        diagnosis: medicalFile.diagnosis || "",
        observation: medicalFile.observation || "",
      });
    }
  }, [medicalFile, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.put(`/file/${medicalFile.id}`, data);
        alert("File updated successfully!");
      } else {
        await api.post("/file", data);
        alert("File created successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting the form", error);
      alert(error.response?.data?.message || "Error while saving the medical file.");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Modify Medical File" : "Create Medical File"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Patient ID</label>
          <input type="number" {...register("patientId")} placeholder="Ex: 1" disabled={isEditMode} />
          <p className="error">{errors.patientId?.message}</p>
        </div>

        <div className="form-group">
          <label>Diagnosis</label>
          <textarea {...register("diagnosis")} rows="3" placeholder="Description of the diagnosis..."></textarea>
          <p className="error">{errors.diagnosis?.message}</p>
        </div>

        <div className="form-group">
          <label>Observation</label>
          <textarea {...register("observation")} rows="3" placeholder="Clinical observations..."></textarea>
          <p className="error">{errors.observation?.message}</p>
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