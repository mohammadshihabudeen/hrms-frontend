type Certificate = {
  id: number;
  courseTitle: string;
  startDate: string;
  endDate: string;
  courseProvider: string;
  document: string | null;
};

interface CertificateState {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
}
