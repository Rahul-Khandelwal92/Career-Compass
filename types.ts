export enum ScreenName {
  HOME = 'HOME', // Career Compass
  PROGRESS = 'PROGRESS', // Skill Gap / Assessment
  LEARN = 'LEARN', // Path / Curriculum
  PROFILE = 'PROFILE',
  DETAIL = 'DETAIL'
}

export type Theme = 'light' | 'dark' | 'minimal';

export interface UserProfile {
  currentRole: string;
  targetRole: string;
  experienceYears: number;
}

export enum SkillStatus {
  TRANSFERABLE = 'TRANSFERABLE',
  GAP = 'GAP'
}

export enum SkillLevel {
  NONE = 'None',
  BASIC = 'Basic',
  EXPERT = 'Expert'
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  status: SkillStatus;
  level: SkillLevel;
  isTransferable: boolean;
}

export interface PathStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  effort: string;
  isGap: boolean;
  resources: Resource[];
  proof?: Proof;
}

export interface Resource {
  type: 'VIDEO' | 'ARTICLE' | 'TEMPLATE';
  title: string;
  author?: string;
  url: string;
}

export interface Proof {
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage: string;
  quote: string;
}