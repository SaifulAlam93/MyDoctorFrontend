export interface MinConceptItem {
    rxcui: string;
    name: string;
    tty: string;
  }
  
  export interface SourceConceptItem {
    id: string;
    name: string;
    url: string;
  }
  
  export interface InteractionConcept {
    minConceptItem: MinConceptItem;
    sourceConceptItem: SourceConceptItem;
  }
  
  export interface InteractionPair {
    interactionConcept: InteractionConcept[];
    severity: string;
    description: string;
  }
  
  export interface InteractionType {
    comment: string;
    minConceptItem: MinConceptItem;
    interactionPair: InteractionPair[];
  }
  
  export interface InteractionTypeGroup {
    sourceDisclaimer: string;
    sourceName: string;
    interactionType: InteractionType[];
  }
  
  export interface DrugInteractionData {
    nlmDisclaimer: string;
    interactionTypeGroup: InteractionTypeGroup[];
  }
  