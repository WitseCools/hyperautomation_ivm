export interface WasteItem {
  certainty: string;
  "icon:": string; 
  long_explanation: string;
  name: string;
  short_explanation: string;
}


  
  // Response type to handle both single object and array responses
  export type WasteResponse = WasteItem | WasteItem[];
  