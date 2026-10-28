import mongoose from 'mongoose';

const rubricItemSchema = new mongoose.Schema({
  parameter: {
    type: String,
    required: [true, 'Rubric parameter name is required'],
    trim: true
  },
  maxScore: {
    type: Number,
    required: true,
    min: 1
  },
  scoreAwarded: {
    type: Number,
    required: true,
    min: 0
  },
  remarks: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: false });

const presentationSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  hackathonName: {
    type: String,
    required: [true, 'Hackathon name is required'],
    trim: true,
    maxlength: [100, 'Hackathon name cannot exceed 100 characters']
  },
  hackathonCategory: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'AI & Machine Learning',
        'Web3 & Blockchain',
        'Developer Tools & Infra',
        'Social Good & Climate',
        'Healthcare & Biotech'
      ],
      message: '{VALUE} is not a supported category.'
    }
  },
  year: {
    type: Number,
    default: 2024
  },
  award: {
    type: String,
    required: [true, 'Award/placement is required (e.g. 1st Place Overall)'],
    trim: true
  },
  team: {
    type: String,
    trim: true,
    default: 'Independent Hackers'
  },
  presentationUrl: {
    type: String,
    required: [true, 'Presentation link or slide deck URL is required'],
    trim: true
  },
  demoVideoUrl: {
    type: String,
    trim: true,
    default: ''
  },
  githubUrl: {
    type: String,
    trim: true,
    default: ''
  },
  pitchSummary: {
    type: String,
    trim: true,
    default: ''
  },
  whyTheyWon: {
    type: [String],
    default: []
  },
  rubrics: {
    type: [rubricItemSchema],
    default: []
  },
  totalScore: {
    type: Number,
    default: 95
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

presentationSchema.index({ hackathonCategory: 1, createdAt: -1 });
presentationSchema.index({
  projectTitle: 'text',
  hackathonName: 'text',
  pitchSummary: 'text',
  tags: 'text'
});

export const Presentation = mongoose.model('Presentation', presentationSchema);
