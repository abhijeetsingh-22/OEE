const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    judgeId: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    isSuccessful: {type: Boolean, default: false},
    results: {type: Object},
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
  },
  {timestamps: true}
);

const Submission = mongoose.model('submission', submissionSchema);
module.exports = Submission;
