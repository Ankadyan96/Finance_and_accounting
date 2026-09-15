export const REFERENCE_POLICY = {
  policyNumber: 'POL-V8NHT',
  lob: 'Commercial Trucking Fleet Primary Auto',
  state: 'Texas (TX)',
  effectiveDate: '2026-08-20',
  expirationDate: '2027-08-20',
  settlementDate: '2026-09-02',
  status: 'Bound & Invoiced', // 'Draft', 'Bound & Invoiced', 'Customer Paid', 'Broker Remitted', 'Bordereau Transmitted', 'Settled'
  insured: {
    id: 'INS-AYUSHI',
    name: 'Ayushi Fleet Logistics Corp',
    contact: 'ayushi@fleetlogistics.com',
    grossPremium: 39260.00
  },
  broker: {
    id: 'ENT-AGY-01',
    name: 'Arora & Sons',
    commissionRate: '6.37%',
    commissionAmount: 2500.00,
    netRemittanceToMga: 36760.00
  },
  mga: {
    id: 'ENT-MGA-01',
    name: 'Vikas & Co',
    overrideRate: '8.91%',
    overrideAmount: 3500.00,
    taxLiability: 3503.00,
    netRemittanceToCarrier: 29757.00
  },
  carrier: {
    id: 'ENT-CAR-01',
    name: 'Vikram & Sons',
    grossWrittenPremium: 33257.00,
    netSettlementExpected: 29757.00,
    bordereauStatus: 'Ready for Ingestion', // 'Pending', 'Ingested to GL', 'Wire Matched'
    wireStatus: 'Pending Wire Match'
  },
  distributionModel: 'DBA' // Direct Bill to Agency (Model 1)
};

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'JE-2026-0006',
    number: 'JE-2026-0006',
    date: '2026-09-03',
    entity: 'ENT-MGA-01',
    entityId: 'ENT-MINE',
    entityName: 'Vikas & Co',
    reference: 'POL-V8NHT Carrier Settlement Disburse',
    description: 'Settlement disburse to Carrier: Vikram & Sons for POL-V8NHT',
    status: 'draft',
    lines: [
      { accountCode: '2200', acct: '2200', accountName: 'Clear Net Premium Payable to Vikram & Sons', debit: 29757.00, credit: 0, desc: 'Clear Net Premium Payable to Vikram & Sons', dims: { 'cost-center': '00 - Corporate', lob: 'Commercial Trucking' } },
      { accountCode: '1001', acct: '1001', accountName: 'Carrier settlement cash disburse (ACH)', debit: 0, credit: 29757.00, desc: 'Carrier settlement cash disburse (ACH)', dims: { location: 'HQ' } }
    ]
  },
  {
    id: 'JE-2026-0002',
    number: 'JE-2026-0002',
    date: '2026-08-20',
    entity: 'ENT-MGA-01',
    entityId: 'ENT-MINE',
    entityName: 'Vikas & Co',
    reference: 'POL-V8NHT Broker Settlement Receipt',
    description: 'Broker premium settlement payment received from Arora & Sons for POL-V8NHT',
    status: 'posted',
    lines: [
      { accountCode: '1001', acct: '1001', accountName: 'Broker premium settlement receipt — Arora & Sons', debit: 36760.00, credit: 0, desc: 'Broker premium settlement receipt — Arora & Sons', dims: { location: 'HQ' } },
      { accountCode: '1100', acct: '1100', accountName: 'Clear Broker Premium Receivable — Arora & Sons', debit: 0, credit: 36760.00, desc: 'Clear Broker Premium Receivable — Arora & Sons', dims: { broker: 'Arora & Sons', lob: 'Commercial Trucking' } }
    ]
  },
  {
    id: 'JE-2026-0003',
    number: 'JE-2026-0003',
    date: '2026-08-20',
    entity: 'ENT-MGA-01',
    entityId: 'ENT-MINE',
    entityName: 'Vikas & Co',
    reference: 'POL-V8NHT Policy Inception & Invoicing',
    description: 'Policy binding and premium invoice issued for POL-V8NHT (Ayushi) · Invoice INV-V8NHT-1',
    status: 'posted',
    lines: [
      { accountCode: '1100', acct: '1100', accountName: 'Premium Receivable — Arora & Sons (Broker Net Remittance)', debit: 36760.00, credit: 0, desc: 'Premium Receivable — Arora & Sons (Broker Net Remittance)', dims: { broker: 'Arora & Sons', lob: 'Commercial Trucking' } },
      { accountCode: '2200', acct: '2200', accountName: 'Net Premium Payable — Vikram & Sons', debit: 0, credit: 29757.00, desc: 'Net Premium Payable — Vikram & Sons', dims: { 'cost-center': '00 - Corporate', lob: 'Commercial Trucking' } },
      { accountCode: '2300', acct: '2300', accountName: 'Surplus Lines Taxes & Regulatory Fees (TX)', debit: 0, credit: 3503.00, desc: 'Surplus Lines Taxes & Regulatory Fees (TX)', dims: { state: 'TX', lob: 'Commercial Trucking' } },
      { accountCode: '4100', acct: '4100', accountName: 'MGA Program Override & Policy Fee Revenue', debit: 0, credit: 3500.00, desc: 'MGA Program Override & Policy Fee Revenue', dims: { mga: 'Vikas & Co', lob: 'Commercial Trucking' } }
    ]
  }
];

export const PAS_FINAL_INVOICE_56IEM = {
  invoiceNumber: "INV-56IEM-1",
  invoiceDate: "2026-08-20",
  dueDate: "2026-09-19",
  paymentTerms: "Net 30",
  currency: "USD",
  policyId: "POL-56IEM",
  quoteNumber: "QT-TRK-2026-89412-v2.0",
  ratingVersion: "v2026.03",
  termNumber: 1,
  namedInsured: "Ayushi",
  producer: "Arora & Sons",
  underwrittenBy: "Priya Nair",
  carrier: "Vikram & Sons",
  mga: "Vikas & Co",
  state: "TX",
  lineOfBusiness: "Commercial Trucking",
  policyTerm: {
    effectiveDate: "2026-08-20",
    expirationDate: "2027-08-20"
  },
  coverages: [
    {
      name: "Auto Liability",
      subtotal: 9413
    },
    {
      name: "Physical Damage",
      subtotal: 21083
    },
    {
      name: "Cargo",
      subtotal: 798
    }
  ],
  coveragePremium: 31294,
  discounts: [
    {
      name: "Claims-Free Credit",
      value: -0.08,
      amt: -2504,
      why: "No claims in prior 3 years"
    }
  ],
  surcharges: [],
  premiumBeforeFees: 28790,
  fees: [
    {
      name: "Policy Fee",
      code: "FEE_POLICY",
      valueType: "Fixed",
      unit: 150,
      qty: 1,
      amt: 150,
      chargeType: "Per Policy",
      taxable: false
    },
    {
      name: "Broker Fee",
      code: "FEE_BROKER",
      valueType: "Percent",
      pct: 8,
      percentOf: "Premium Before Fees",
      base: 28790,
      capped: null,
      minFee: 250,
      maxFee: 2500,
      qty: 1,
      amt: 2303,
      chargeType: "Per Policy",
      taxable: false
    },
    {
      name: "Inspection Fee",
      code: "FEE_INSPECT",
      valueType: "Fixed",
      unit: 75,
      qty: 1,
      amt: 75,
      chargeType: "Per Policy",
      taxable: false
    },
    {
      name: "MVR / CSA Report Fee",
      code: "FEE_MVR",
      valueType: "Fixed",
      unit: 12,
      qty: 2,
      amt: 24,
      chargeType: "Per Driver",
      taxable: false
    },
    {
      name: "Vehicle Inspection Fee",
      code: "FEE_VEHINSP",
      valueType: "Fixed",
      unit: 45,
      qty: 2,
      amt: 90,
      chargeType: "Per Vehicle",
      taxable: false
    },
    {
      name: "Managing General Agent Fee",
      code: "FEE_MGA",
      valueType: "Percent",
      pct: 5,
      percentOf: "Premium Before Fees",
      base: 28790,
      capped: null,
      minFee: 100,
      maxFee: 0,
      qty: 1,
      amt: 1440,
      chargeType: "Per Policy",
      taxable: false
    },
    {
      name: "Surplus Lines Filing Fee",
      code: "FEE_SLFILE",
      valueType: "Percent",
      pct: 0.35,
      percentOf: "Premium + Taxes",
      base: 30186,
      capped: null,
      minFee: 25,
      maxFee: 500,
      qty: 1,
      amt: 106,
      chargeType: "Per Policy",
      taxable: false
    },
    {
      name: "Terrorism (TRIA) Charge",
      code: "FEE_TRIA",
      valueType: "Percent",
      pct: 1.5,
      percentOf: "Coverage Premium",
      base: 31294,
      capped: null,
      minFee: 0,
      maxFee: 0,
      qty: 1,
      amt: 469,
      chargeType: "Per Policy",
      taxable: true
    }
  ],
  totalFees: 4657,
  tax: {
    pct: 0.048499999999999995,
    amount: 1419
  },
  countyTax: null,
  totalTax: 1419,
  totalPremium: 34866,
  remittance: {
    commissionRate: 0.15,
    grossCommission: 5230,
    brokerCommission: 2876,
    mgaCommission: 2353,
    carrierNet: 29636
  },
  deliveryStatus: "Generated",
  deliveredAt: null
};
