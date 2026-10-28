import Joi from 'joi';

const roadmapWeekSchema = Joi.object({
  week: Joi.number().integer().min(1).max(52).required(),
  title: Joi.string().trim().min(3).max(150).required(),
  goal: Joi.string().trim().min(5).max(300).required(),
  tasks: Joi.array().items(Joi.string().trim().min(2)).min(1).required(),
  milestone: Joi.string().trim().min(3).max(200).required()
});

const technicalTopicSchema = Joi.object({
  topic: Joi.string().trim().min(2).max(100).required(),
  summary: Joi.string().trim().min(5).max(500).required(),
  keyPoints: Joi.array().items(Joi.string().trim()).min(1).required(),
  resources: Joi.array().items(Joi.string().uri()).default([])
});

const sampleQuestionSchema = Joi.object({
  question: Joi.string().trim().min(5).max(300).required(),
  category: Joi.string().valid(
    'Coding',
    'System Design',
    'JavaScript & Frameworks',
    'Backend & DB',
    'Behavioral',
    'Hackathon Pitching'
  ).default('Coding'),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').default('Medium'),
  answer: Joi.string().trim().min(10).required(),
  tips: Joi.array().items(Joi.string().trim()).default([])
});

const prepIntelligenceSchema = Joi.object({
  roadmap: Joi.array().items(roadmapWeekSchema).default([]),
  technicalTopics: Joi.array().items(technicalTopicSchema).default([]),
  sampleQuestions: Joi.array().items(sampleQuestionSchema).default([])
});

export const createOpportunitySchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required().messages({
    'string.empty': 'Opportunity title is required',
    'any.required': 'Opportunity title is required',
    'string.min': 'Opportunity title must be at least 3 characters',
    'string.max': 'Opportunity title cannot exceed 150 characters'
  }),
  company: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Company or organization name is required',
    'any.required': 'Company or organization name is required'
  }),
  category: Joi.string().valid('Hackathon', 'Internship', 'Fresher Job').required().messages({
    'any.only': 'Category must be one of: Hackathon, Internship, Fresher Job',
    'any.required': 'Category is required'
  }),
  location: Joi.string().trim().max(100).default('Remote'),
  workMode: Joi.string().valid('Remote', 'In-Person', 'Hybrid').default('Remote'),
  tags: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim().min(1)),
    Joi.string().trim().allow('')
  ).default([]),
  description: Joi.string().trim().max(2000).allow('').default(''),
  deadline: Joi.date().iso().allow(null, '').default(null),
  eventDate: Joi.date().iso().allow(null, '').default(null),
  applicationUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow('').default(''),
  prepIntelligence: prepIntelligenceSchema.optional(),
  isDemo: Joi.boolean().default(false)
});

export const queryOpportunitySchema = Joi.object({
  category: Joi.string().valid('All', 'All Opportunities', 'Hackathon', 'Internship', 'Fresher Job').optional(),
  search: Joi.string().trim().max(100).allow('').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(9)
});
