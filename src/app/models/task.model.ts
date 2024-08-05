export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  requiredSkills?: string;
  requiredSkillsNormalized?: string;
  requiredExpertise?: string;
  requiredExpertiseNormalized?: string;
  descriptionNormalized?: string;
  userId?: number;
  creationDate: string;
  dueDate: string;
  statusId: number;
  tags: Tag[];
}

export interface CreateTagDto {
  name: string;
  color: string;
}

export interface Status {
  id: number;
  name: string;
  tasks: Task[];
}

export interface TaskCreateDto {
  name: string;
  description: string;
  requiredSkills?: string;
  requiredExpertise?: string;
  statusId: number;
  creationDate: string;
  dueDate: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  job?: string;
  curriculum?: string;
  curriculumNormalized?: string;
  password: string;
  image?: string;
  roleId: number;
  skills?: string;
  skillsNormalized?: string;
  expertise?: string;
  expertiseNormalized?: string;
}

export interface UserDto {
  id: number
  email: string;
  name: string;
  lastname: string;
  job: string;
  curriculum: string;
  skills?: string;
  expertise?: string;
  image?: string;
}

export interface UserProfileRecommend {
  user: string;
  email: string;
  curriculum: string;
  similarity: number;
}
