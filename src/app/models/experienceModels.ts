interface Experience {
  id: number;
  companyName: string;
  startDate: string; // Change to string type
  endDate: string; // Change to string type
  position: string;
  document: any;
}

interface ExperienceState {
  experiences: Experience[];
}
