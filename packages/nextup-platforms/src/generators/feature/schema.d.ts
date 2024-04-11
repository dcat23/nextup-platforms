export interface FeatureGeneratorSchema {
  name: string;
  api?: string[];
  hooks?: string[];
  stores?: string[];
  components?: string[];
  types?: string[];
  utils?: string[];
}
