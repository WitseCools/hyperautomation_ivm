export interface WasteItem {
  certainty: string;
  "icon:": string; 
  long_explanation: string;
  name: string;
  short_explanation: string;
}

export type WasteResponse = WasteItem | WasteItem[];
  