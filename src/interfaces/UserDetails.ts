export interface UserDetails {
  websiteName: string;
  hero: HeroData;
  about: AboutData;
  services: Service[];
  projects: Project[];
  skills: SkillsData;
  contact: ContactData;
  socialLinks: SocialLinks;
  email: string; // For admin login
  password: string; // For admin login
}

export interface HeroData {
  firstName: string;
  lastName: string;
  location: Location;
  userImage: string;
  bannerImage: string;
}

export interface Location {
  country: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface AboutData {
  skills: {
    description: string;
    skillsList: string[];
  };
  experience: Experience[];
  education: Education[];
}

export interface Experience {
  designation: string;
  company: string;
  employmentPeriod: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Service {
  title: string;
  logo: string;
  subtitle: string;
  description: string;
}

export interface Project {
  title: string;
  subtitle: string;
  thumbnail: string;
  fullImage: string;
  liveLink: string;
  codeLink: string;
  technologies: string[];
  category: 'single-page' | 'multi-page';
}

export interface SkillsData {
  technologies: Technology[];
  professionalSkills: ProfessionalSkill[];
}

export interface Technology {
  name: string;
  logo: string;
}

export interface ProfessionalSkill {
  name: string;
  logo: string;
  level: number;
}

export interface ContactData {
  phone: {
    countryCode: string;
    number: string;
  };
  email: string;
  location: Location;
  cvLink: string;
  googleMapLink: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
}