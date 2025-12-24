
export enum ViewMode {
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export interface DiagramState {
  code: string;
  viewMode: ViewMode;
}
