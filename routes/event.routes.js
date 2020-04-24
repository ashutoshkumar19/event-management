const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User.model');
const Event = require('../models/Event.model');

// @route   POST /event
// @desc    Create an event
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('organizer', 'Name of Organizer is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
      check('venue', 'Venue is required').not().isEmpty(),
      check('date_from', 'Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');
      const { title, organizer, description, venue, date_from, date_to } = req.body;

      const newEvent = new Event({
        title: title,
        organizer: organizer,
        description: description,
        venue: venue,
        date_from: date_from,
        date_to: date_to,
        user: req.user.id,
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /event
// @desc    Get all events
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // const events = await Event.find().sort({ date: -1 });
    const events = await Event.find({ user: req.user.id }).sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /event/:event_id
// @desc    Get event by ID
// @access  Private
router.get('/:event_id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /event/:event_id
// @desc    DELETE event by ID
// @access  Private
router.delete('/:event_id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    // Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User NOT authorized' });
    }
    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
