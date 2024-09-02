export interface ResumeProfile {
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  url: string;
}

export interface ResumeWorkExperience {
  company: string;
  title: string;
  date: string;
  descriptions: string[];
  id?: string;
}

export interface ResumeEducation {
  school: string;
  degree: string;
  gpa: string;
  date: string;
  descriptions: string[];
  id?: string;
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
  id?: string;
  company?: string;
  title?: string;
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  // featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}
export type ResumeKey = keyof Resume;

export type CreateHandleChangeArgsWithDescriptions<T> =
  | [field: Exclude<keyof T, "descriptions">, value: string]
  | [field: "descriptions", value: string];

export interface GptDataType {
  personalInformation: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    github: string;
    bio: string;
  };
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    dates: string;
    responsibilities: string[];
  }[];
}
