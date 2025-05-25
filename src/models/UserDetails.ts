import { Schema, model, Document } from 'mongoose';
import { UserDetails, HeroData, AboutData, Service, Project, SkillsData, ContactData, SocialLinks, Location, Experience, Education, Technology, ProfessionalSkill } from '../interfaces/UserDetails';

interface UserDetailsDocument extends UserDetails, Document {}

const LocationSchema = new Schema<Location>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const HeroSchema = new Schema<HeroData>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  userImage: { type: String, required: true },
  bannerImage: { type: String, required: true },
});

const ExperienceSchema = new Schema<Experience>({
  designation: { type: String, required: true },
  company: { type: String, required: true },
  employmentPeriod: { type: String, required: true },
  description: { type: String, required: true },
});

const EducationSchema = new Schema<Education>({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
});

const AboutSchema = new Schema<AboutData>({
  skills: {
    description: { type: String, required: true },
    skillsList: [{ type: String, required: true }],
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
});

const ServiceSchema = new Schema<Service>({
  title: { type: String, required: true },
  logo: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
});

const ProjectSchema = new Schema<Project>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  thumbnail: { type: String, required: true },
  fullImage: { type: String, required: true },
  liveLink: { type: String, required: true },
  codeLink: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  category: { type: String, enum: ['single-page', 'multi-page'], required: true },
});

const TechnologySchema = new Schema<Technology>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

const ProfessionalSkillSchema = new Schema<ProfessionalSkill>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
});

const SkillsSchema = new Schema<SkillsData>({
  technologies: [TechnologySchema],
  professionalSkills: [ProfessionalSkillSchema],
});

const ContactSchema = new Schema<ContactData>({
  phone: {
    countryCode: { type: String, required: true },
    number: { type: String, required: true },
  },
  email: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  cvLink: { type: String, required: true },
  googleMapLink: { type: String, required: true },
});

const SocialLinksSchema = new Schema<SocialLinks>({
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  twitter: { type: String, required: true },
  youtube: { type: String, required: true },
});

const UserDetailsSchema = new Schema<UserDetailsDocument>({
  websiteName: { type: String, required: true },
  hero: { type: HeroSchema, required: true },
  about: { type: AboutSchema, required: true },
  services: [ServiceSchema],
  projects: [ProjectSchema],
  skills: { type: SkillsSchema, required: true },
  contact: { type: ContactSchema, required: true },
  socialLinks: { type: SocialLinksSchema, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<UserDetailsDocument>('UserDetails', UserDetailsSchema);