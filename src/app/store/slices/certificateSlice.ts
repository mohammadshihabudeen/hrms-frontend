// store/slices/certificateSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Certificate {
  id: number;
  courseTitle: string;
  startDate: string; // Change to string type
  endDate: string; // Change to string type
  courseProvider: string;
  document: string | null;
}

interface CertificateState {
  certificates: Certificate[];
}

const initialState: CertificateState = {
  certificates: [],
};

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    },
    deleteCertificate: (state, action: PayloadAction<number>) => {
      state.certificates = state.certificates.filter(
        (cert) => cert.id !== action.payload
      );
    },
  },
});

export const { addCertificate, deleteCertificate } = certificateSlice.actions;
export default certificateSlice.reducer;
