
export interface BiotechMetric {
  label: string;
  value: string;
  description: string;
}

export interface PipelineStage {
  name: string;
  stage: number; // 1-5 (Discovery, Pre-clinical, Phase I, II, III)
  description: string;
}

export interface EnhancedContent {
  headline: string;
  summary: string;
  visionAlignment: string;
  keyInsights: string[];
  investorPitch: string;
  marketOpportunity: string;
}
