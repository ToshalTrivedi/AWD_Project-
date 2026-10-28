import Joi from 'joi';

const rubricItemSchema = Joi.object({
  parameter: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'Rubric parameter name is required'
  }),
  maxScore: Joi.number().integer().min(1).max(100).required(),
  scoreAwarded: Joi.number().min(0).max(100).required(),
  remarks: Joi.string().trim().max(500).allow('').default('')
});

export const createPresentationSchema = Joi.object({
  projectTitle: Joi.string().trim().min(3).max(150).required().messages({
    'string.empty': 'Project title is required',
    'string.min': 'Project title must be at least 3 characters',
    'any.required': 'Project title is required'
  }),
  hackathonName: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Hackathon name is required',
    'any.required': 'Hackathon name is required'
  }),
  hackathonCategory: Joi.string().valid(
    'AI & Machine Learning',
    'Web3 & Blockchain',
    'Developer Tools & Infra',
    'Social Good & Climate',
    'Healthcare & Biotech'
  ).required().messages({
    'any.only': 'Invalid category. Must be one of the recognized global hackathon tracks.',
    'any.required': 'Hackathon category is required'
  }),
  year: Joi.number().integer().min(2015).max(2030).default(2024),
  award: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Award or placement is required',
    'any.required': 'Award or placement is required'
  }),
  team: Joi.string().trim().max(100).allow('').default('Independent Team'),
  presentationUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required().messages({
    'string.empty': 'Presentation URL is required',
    'string.uri': 'Presentation link must be a valid HTTP/HTTPS URL',
    'any.required': 'Presentation URL is required'
  }),
  demoVideoUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow('').default(''),
  githubUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow('').default(''),
  pitchSummary: Joi.string().trim().min(10).max(1000).required().messages({
    'string.empty': 'Pitch summary is required',
    'string.min': 'Pitch summary must be at least 10 characters',
    'any.required': 'Pitch summary is required'
  }),
  whyTheyWon: Joi.array().items(Joi.string().trim().min(5)).min(1).required().messages({
    'array.min': 'Please provide at least 1 winning pointer explaining why this presentation won.'
  }),
  rubrics: Joi.array().items(rubricItemSchema).min(1).required().messages({
    'array.min': 'Please provide at least 1 rubric evaluation parameter.'
  }),
  tags: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ).default([])
});

export const queryPresentationSchema = Joi.object({
  category: Joi.string().trim().allow('', 'All', 'All Categories').optional(),
  search: Joi.string().trim().max(100).allow('').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(9)
});
