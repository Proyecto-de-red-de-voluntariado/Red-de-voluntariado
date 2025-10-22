export type VolunteerProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ONGProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  ongId: string;
};

export type Enrollment = {
  id: string;
  volunteerId: string;
  projectId: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
};