export type DaySchedule = {
  open: string;
  close: string;
  isOpen: boolean;
};

export type WorkingHours = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type Clinic = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ClinicSettings = {
  id: string;
  clinicId: string;
  workingHours: WorkingHours;
  maxPatientsPerDay: number;
  appointmentDuration: number;
  gracePeriod: number;
  delayThreshold: number;
  createdAt: string;
  updatedAt: string;
  clinic: Clinic;
};

export type UpdateClinicSettingsData = {
  name?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  maxPatientsPerDay?: number;
  appointmentDuration?: number;
  gracePeriod?: number;
  delayThreshold?: number;
  workingHours?: WorkingHours;
};

export type ClinicSettingsResponse = {
  success: boolean;
  message: string;
  data: ClinicSettings;
};
