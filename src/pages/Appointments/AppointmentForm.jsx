import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";

// Schéma de validation
const schema = yup.object({
  patientId: yup.number().typeError("The patient ID must be a number").required("Required"),
  doctorId: yup.number().typeError("The doctor ID must be a number").required("Required"),
  appointmentDate: yup.string().required("The date and time are required"),
  status: yup.string().required("The status is required"),
}).required();

export default function AppointmentForm({ appointment, onSuccess, onCancel }) {
  const isEditMode = !!appointment;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      patientId: "", doctorId: "", appointmentDate: "", status: "PLANNED",
    },
  });

  useEffect(() => {
    if (appointment) {
      const formattedDate = appointment.appointmentDate 
        ? new Date(appointment.appointmentDate).toISOString().slice(0, 16) 
        : "";

      reset({
        patientId: appointment.patientId || "",
        doctorId: appointment.doctorId || "",
        appointmentDate: formattedDate,
        status: appointment.status || "PLANNED",
      });
    }
  }, [appointment, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        appointmentDate: new Date(data.appointmentDate).toISOString()
      };

      if (isEditMode) {
        await api.put(`/appointment/${appointment.id}`, formattedData);
        alert("Appointment updated successfully!");
      } else {
        await api.post("/appointment", formattedData);
        alert("Appointment scheduled successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error saving the appointment.");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Modify Appointment" : "Schedule Appointment"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
        <div className="form-group">
          <label>Patient ID</label>
          <input type="number" {...register("patientId")} placeholder="e.g., 1" />
          <p className="error">{errors.patientId?.message}</p>
        </div>

        <div className="form-group">
          <label>Doctor ID</label>
          <input type="number" {...register("doctorId")} placeholder="e.g., 2" />
          <p className="error">{errors.doctorId?.message}</p>
        </div>

        <div className="form-group">
          <label>Date and Time</label>
          <input type="datetime-local" {...register("appointmentDate")} />
          <p className="error">{errors.appointmentDate?.message}</p>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select {...register("status")}>
            <option value="PLANNED">Planned (PLANNED)</option>
            <option value="COMPLETED">Completed (COMPLETED)</option>
            <option value="CANCELED">Canceled (CANCELED)</option>
          </select>
          <p className="error">{errors.status?.message}</p>
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