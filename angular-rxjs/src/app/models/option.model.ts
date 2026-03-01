export interface Option {
  id: string;
  label: string;
  value: number;
  category: 'front' | 'back' | 'other';
}

export interface Selection {
  boxId: number;
  optionId: string;
}

export interface AppState {
  options: Option[];
  selections: Selection[];
  activeBoxId: number;
}
