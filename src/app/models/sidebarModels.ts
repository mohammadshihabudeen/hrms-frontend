interface SidebarState {
  isOpen: boolean;
  elements: {
    id: number;
    name: string;
    active: boolean;
    viewBox: string;
    svgPath: string[];
  }[];
}
