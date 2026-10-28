import mongoose from 'mongoose';

const roadmapWeekSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  title: { type: String, required: true },
  goal: { type: String, required: true },
  tasks: [{ type: String, required: true }],
  milestone: { type: String, required: true }
}, { _id: false });

const technicalTopicSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  summary: { type: String, required: true },
  keyPoints: [{ type: String, required: true }],
  resources: [{ type: String }]
}, { _id: false });

const sampleQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Coding', 'System Design', 'JavaScript & Frameworks', 'Backend & DB', 'Behavioral', 'Hackathon Pitching'],
    default: 'Coding'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  answer: { type: String, required: true },
  tips: [{ type: String }]
}, { _id: false });

const prepIntelligenceSchema = new mongoose.Schema({
  roadmap: [roadmapWeekSchema],
  technicalTopics: [technicalTopicSchema],
  sampleQuestions: [sampleQuestionSchema]
}, { _id: false });

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Opportunity title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  company: {
    type: String,
    required: [true, 'Company or organization name is required'],
    trim: true,
    maxlength: [100, 'Company cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Hackathon', 'Internship', 'Fresher Job'],
      message: '{VALUE} is not a valid category. Must be Hackathon, Internship, or Fresher Job'
    }
  },
  location: {
    type: String,
    trim: true,
    default: 'Remote'
  },
  workMode: {
    type: String,
    enum: ['Remote', 'In-Person', 'Hybrid'],
    default: 'Remote'
  },
  tags: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  deadline: {
    type: Date,
    default: null
  },
  eventDate: {
    type: Date,
    default: null
  },
  applicationUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // optional
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    },
    default: ''
  },
  prepIntelligence: {
    type: prepIntelligenceSchema,
    default: () => ({
      roadmap: [],
      technicalTopics: [],
      sampleQuestions: []
    })
  },
  isDemo: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for high performance searching and filtering
opportunitySchema.index({ category: 1, createdAt: -1 });
opportunitySchema.index({ tags: 1 });
opportunitySchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  tags: 'text'
});

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);
