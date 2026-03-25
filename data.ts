import { Skill, SkillStatus, SkillLevel, PathStep } from './types';

// Initial Skills for Assessment
export const INITIAL_SKILLS: Skill[] = [
  {
    id: 's1',
    name: 'User Research',
    description: 'Interviews, surveys, persona creation',
    status: SkillStatus.TRANSFERABLE,
    level: SkillLevel.EXPERT, // Default mock
    isTransferable: true
  },
  {
    id: 's2',
    name: 'Data Analysis',
    description: 'SQL, Amplitude, Metrics tracking',
    status: SkillStatus.GAP,
    level: SkillLevel.NONE,
    isTransferable: false
  },
  {
    id: 's3',
    name: 'PRD Writing',
    description: 'Requirements gathering, documentation',
    status: SkillStatus.GAP,
    level: SkillLevel.BASIC,
    isTransferable: false
  },
  {
    id: 's4',
    name: 'Stakeholder Mgmt',
    description: 'Communication, alignment, negotiation',
    status: SkillStatus.TRANSFERABLE,
    level: SkillLevel.EXPERT,
    isTransferable: true
  },
  {
    id: 's5',
    name: 'Roadmapping',
    description: 'Prioritization frameworks, timelines',
    status: SkillStatus.GAP,
    level: SkillLevel.NONE,
    isTransferable: false
  }
];

// Path Steps
export const PATH_STEPS: PathStep[] = [
  {
    id: 'step-1',
    title: 'Master the PRD',
    subtitle: 'Core Product Skill • Documentation',
    description: 'Product Requirements Documents are the lifeblood of a PM. Mastering this ensures you can translate nebulous business goals into concrete engineering tasks without ambiguity.',
    status: 'current',
    effort: '3 Weeks',
    isGap: true,
    resources: [
      { type: 'VIDEO', title: 'How to write a PRD by Lenny Rachitsky', url: '#' },
      { type: 'TEMPLATE', title: 'The Amazon 6-Pager Format', url: '#' },
      { type: 'ARTICLE', title: 'Avoiding Scope Creep', url: '#' }
    ],
    proof: {
      authorName: 'Anjali S.',
      authorRole: 'PM at',
      authorCompany: 'zomato',
      authorImage: 'https://picsum.photos/id/64/200/200',
      quote: "I was overwhelmed by documentation until I used these exact templates. They helped me crack the case study round at Zomato during my transition from Marketing."
    }
  },
  {
    id: 'step-2',
    title: 'Data & SQL Basics',
    subtitle: 'Technical Skill • Analytics',
    description: 'Learn to pull your own data so you do not have to rely on analysts for every question.',
    status: 'locked',
    effort: '4 Weeks',
    isGap: true,
    resources: [],
    proof: {
      authorName: 'Rahul M.',
      authorRole: 'APM at',
      authorCompany: 'Swiggy',
      authorImage: 'https://picsum.photos/id/91/200/200',
      quote: "Knowing basic SQL set me apart from other internal transfer candidates. It showed I was ready to be independent."
    }
  },
  {
    id: 'step-3',
    title: 'System Design for PMs',
    subtitle: 'Technical Fluency',
    description: 'Understand APIs, latency, and databases enough to have a conversation with Engineering Managers.',
    status: 'locked',
    effort: '2 Weeks',
    isGap: true,
    resources: []
  }
];
