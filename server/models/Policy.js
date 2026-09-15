import mongoose from 'mongoose';

// Backs the PAS "Policies Register" tab. `base` carries the Stage 1
// (POLICY_BINDING_INVOICED) premium/taxAndFees/commission split the Event
// Data Injector needs to pre-fill every lifecycle stage for this policy —
// see PasPolicyPage.jsx's computeStageAmounts. `raw` keeps the originally
// uploaded invoice JSON, if any, for reference/audit.
const policySchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: '' },
  date: { type: String, default: '' },
  premium: { type: Number, default: 0 },
  commissionPct: { type: Number, default: 8 },
  status: { type: String, default: 'BOUND' },
  brokerName: { type: String, default: '' },
  mgaName: { type: String, default: '' },
  carrierName: { type: String, default: '' },
  invoiceNumber: { type: String, default: '' },
  lob: { type: String, default: 'Commercial Trucking' },
  state: { type: String, default: 'TX' },
  base: {
    premium: { type: Number, default: 0 },
    taxAndFees: { type: Number, default: 0 },
    commission: { type: Number, default: 0 }
  },
  source: { type: String, default: 'manual' },
  raw: { type: mongoose.Schema.Types.Mixed }
}, {
  timestamps: true
});

const Policy = mongoose.model('Policy', policySchema);

export default Policy;
