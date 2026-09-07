// src/modules/visits/index.ts

export { default as VisitsHeader } from "./VisitsHeader";
export { default as VisitsFilters } from "./VisitsFilters";
export { default as VisitsTable } from "./VisitsTable";
export { default as VisitTableRow } from "./VisitTableRow";
export { default as VisitDetails } from "./VisitDetails";
export { default as VisitForm } from "./VisitForm";
export { default as VisitCard } from "./VisitCard";
export { default as VisitStats } from "./VisitStats";
export { default as VisitPagination } from "./VisitPagination";
export { default as CreateVisitModal } from "./CreateVisitModal";
export { default as EditVisitModal } from "./EditVisitModal";
export { default as DeleteVisitDialog } from "./DeleteVisitDialog";

export { useVisits } from "../../../hooks/visits/useVisits";
export { useVisit } from "../../../hooks/visits/useVisit";
export { usePatientVisits } from "../../../hooks/visits/usePatientVisits";
export { useCreateVisit } from "../../../hooks/visits/useCreateVisit";
export { useUpdateVisit } from "../../../hooks/visits/useUpdateVisit";
export { useDeleteVisit } from "../../../hooks/visits/useDeleteVisit";

export { visitService } from "../../../services/visit";

export type {
  Visit,
  VisitPatient,
  VisitCreatedBy,
  VisitUpdatedBy,
  VisitAppointment,
  VisitQueueEntry,
  VisitFilters,
  VisitMeta,
  VisitsResponse,
  VisitResponse,
  CreateVisitPayload,
  UpdateVisitPayload,
} from "../../../types/visit";
