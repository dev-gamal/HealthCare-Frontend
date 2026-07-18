import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

const schema = yup.object({
  patientId: yup.number().typeError("Patient ID must be a number").required("Required"),
  doctorId: yup.number().typeError("Doctor ID must be a number").required("Required"),
  diagnosis: yup.string().required("Diagnosis is required"),
  treatment: yup.string().required("Treatment is required"),
  notes: yup.string(),
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
      patientId: "", doctorId: "", diagnosis: "", treatment: "", notes: "",
    },
  });

  useEffect(() => {
    if (medicalFile) {
      reset({
        patientId: medicalFile.patientId || "",
        doctorId: medicalFile.doctorId || "",
        diagnosis: medicalFile.diagnosis || "",
        treatment: medicalFile.treatment || "",
        notes: medicalFile.notes || "",
      });
    }
  }, [medicalFile, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await api.put(`/medical-files/${medicalFile.id}`, data);
        alert("File updated successfully!");
      } else {
        await api.post("/medical-files", data);
        alert("File created successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Error while saving the medical file.");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Modify Medical File" : "Create Medical File"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Patient ID</label>
          <input type="number" {...register("patientId")} placeholder="Ex: 1" />
          <p className="error">{errors.patientId?.message}</p>
        </div>

        <div className="form-group">
          <label>Doctor ID</label>
          <input type="number" {...register("doctorId")} placeholder="Ex: 2" />
          <p className="error">{errors.doctorId?.message}</p>
        </div>

        <div className="form-group">
          <label>Diagnostic</label>
          <textarea {...register("diagnosis")} rows="3" placeholder="Description of the diagnosis..."></textarea>
          <p className="error">{errors.diagnosis?.message}</p>
        </div>

        <div className="form-group">
          <label>Treatment</label>
          <textarea {...register("treatment")} rows="3" placeholder="Details of the treatment..."></textarea>
          <p className="error">{errors.treatment?.message}</p>
        </div>

        <div className="form-group">
          <label>Additional Notes (Optional)</label>
          <textarea {...register("notes")} rows="2" placeholder="Observations..."></textarea>
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