export interface Contact {
  name: string;
  number: string;
  email: string;
  relationship: string;
}

export interface Reporter {
  name: string;
  number: string;
  email: string;
  relationship: string;
}

export interface JobContact {
  name: string;
  number: string;
  email: string;
  relationship: string;
}

export interface CustomAlerts {
  acceptSLA: number; // minutes
  onsiteSLA: number; // minutes
  completedSLA: number; // minutes
}

export interface JobAlert {
  id: string;
  type: 'ACCEPTED' | 'ONSITE' | 'COMPLETED' | 'OVERDUE';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface Job {
  id: string;
  jobNumber: string;
  customer: string;
  site: string;
  engineer: string;
  contact: JobContact;
  reporter: Reporter;
  status: 'green' | 'amber' | 'red';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dateLogged: Date;
  dateAccepted: Date | null;
  dateOnSite: Date | null;
  dateCompleted: Date | null;
  description: string;
  jobType: 'Maintenance' | 'Repair' | 'Installation' | 'Emergency' | 'Inspection' | 'Draft' | 'Out of Hours' | 'Call Out';
  category: 'Electrical' | 'Mechanical' | 'Plumbing' | 'HVAC' | 'General' | 'Fire Safety' | 'Security Systems' | 'Painting' | 'Flooring' | 'Roofing';
  targetCompletionTime: number; // minutes
  reason: string | null;
  customAlerts: CustomAlerts;
  alerts?: JobAlert[];
  // Additional JobLogic fields
  primaryJobTrade?: string;
  secondaryJobTrades?: string[];
  customerOrderNumber?: string;
  referenceNumber?: string;
  jobOwner?: string;
  tags?: string[];
  jobRef1?: string;
  jobRef2?: string;
  requiresApproval?: boolean;
  preferredAppointmentDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  lockVisitDateTime?: boolean;
  deployToMobile?: boolean;
  isRecurringJob?: boolean;
  completionTimeFromEngineerOnsite?: boolean;
  project?: string;
}

export interface JobFormData {
  customer: string;
  site: string;
  contact: JobContact;
  reporter: Reporter;
  description: string;
  jobType: Job['jobType'];
  category: Job['category'];
  priority: Job['priority'];
  targetCompletionTime: number;
  engineer: string;
  project: string;
  customAlerts: CustomAlerts;
  // Additional fields
  primaryJobTrade: string;
  secondaryJobTrades: string[];
  customerOrderNumber: string;
  referenceNumber: string;
  jobOwner: string;
  tags: string[];
  jobRef1: string;
  jobRef2: string;
  requiresApproval: boolean;
  preferredAppointmentDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  lockVisitDateTime: boolean;
  deployToMobile: boolean;
  isRecurringJob: boolean;
  completionTimeFromEngineerOnsite: boolean;
}

export interface Customer {
  id: number;
  name: string;
  sites: string[];
}

export interface Engineer {
  name: string;
  email: string;
  phone: string;
  status: 'accept' | 'onsite' | 'travel' | 'completed' | 'require_revisit';
  syncStatus: 'synced' | 'pending' | 'error';
  avatar?: string;
}