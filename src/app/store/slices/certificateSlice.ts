import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCertificates,
  createCertificate,
  deleteCertificate,
} from "../../services/certificateService";

const initialState: CertificateState = {
  certificates: [],
  loading: false,
  error: null,
};

export const fetchCertificates = createAsyncThunk(
  "certificates/fetchCertificates",
  async () => {
    const response = await getCertificates();
    return response;
  }
);

export const addNewCertificate = createAsyncThunk(
  "certificates/addNewCertificate",
  async (certificate: Certificate) => {
    const response = await createCertificate(certificate);
    return response;
  }
);

export const removeCertificate = createAsyncThunk(
  "certificates/removeCertificate",
  async (id: number) => {
    await deleteCertificate(id);
    return id;
  }
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch certificates";
      })
      .addCase(addNewCertificate.fulfilled, (state, action) => {
        state.certificates.push(action.payload);
      })
      .addCase(removeCertificate.fulfilled, (state, action) => {
        state.certificates = state.certificates.filter(
          (cert) => cert.id !== action.payload
        );
      });
  },
});

export default certificateSlice.reducer;
