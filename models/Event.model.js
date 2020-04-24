const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  organizer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  venue: {
    type: String,
    required: true,
  },
  date_from: {
    type: Date,
    required: true,
  },
  date_to: {
    type: Date,
  },
  attendees: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Event = mongoose.model('event', EventSchema);
