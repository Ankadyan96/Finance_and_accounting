import express from 'express';
import Policy from '../models/Policy.js';

const router = express.Router();

// GET all policies in the Policies Register
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new policy — e.g. uploaded from an invoice JSON on the Policies
// Register tab. Rejected with 409 if the policy number already exists.
router.post('/', async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({ error: 'Policy number is required' });
    }

    const existing = await Policy.findOne({ number });
    if (existing) {
      return res.status(409).json({ error: `Policy ${number} already exists`, policy: existing });
    }

    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    if (error.code === 11000) {
      const existing = await Policy.findOne({ number: req.body.number });
      return res.status(409).json({ error: `Policy ${req.body.number} already exists`, policy: existing });
    }
    res.status(400).json({ error: error.message });
  }
});

// PATCH update a policy (e.g. its status after a lifecycle stage is
// injected) — upserts so a built-in demo policy that was never explicitly
// created still gets a real Mongo record the first time its status changes.
router.patch('/:number', async (req, res) => {
  try {
    const policy = await Policy.findOneAndUpdate(
      { number: req.params.number },
      { $set: req.body, $setOnInsert: { number: req.params.number } },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    res.json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a policy
router.delete('/:number', async (req, res) => {
  try {
    const policy = await Policy.findOneAndDelete({ number: req.params.number });
    if (!policy) return res.status(404).json({ error: 'Policy not found' });
    res.json({ message: 'Policy deleted', number: req.params.number });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
