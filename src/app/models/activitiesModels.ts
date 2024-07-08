interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

interface ActivitiesState {
  activities: Activity[];
}
