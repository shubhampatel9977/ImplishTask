import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getAllCompany, addCompany, updateCompanyById, deleteCompanyById } from '../actions/companyActions';

interface Company {
  code: number;
  name: string;
  machines: number;
  area: string;
  link: string;
  frequency: number;
  c_number: string;
  remark: string;
}
interface CounterState {
  companyData: Company[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CounterState = {
  companyData: [],
  status: 'idle',
  error: null,
};

export const fetchAllCompanys = createAsyncThunk('api/fetchAll', async () => {
  const response: any = await getAllCompany();
  return response.data;
});

export const addCompanyAsync = createAsyncThunk('api/add', async (payload: Company) => {
  const response: any = await addCompany(payload);
  return response.data;
});

export const updateCompanyAsync = createAsyncThunk('api/update', async (payload: Company) => {
  const response: any = await updateCompanyById(payload.code, payload);
  return response.data;
});

export const deleteCompanyAsync = createAsyncThunk('api/delete', async (code: number) => {
  await deleteCompanyById(code);
  return code;
});

const companySlice = createSlice({
  name: 'companyData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCompanys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCompanys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyData = action.payload;
      })
      .addCase(fetchAllCompanys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Something went wrong in fetchAllCompanys';
      })

      .addCase(addCompanyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCompanyAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyData.push(action.payload);
      })
      .addCase(addCompanyAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Something went wrong in addCompanyAsync';
      })

      .addCase(updateCompanyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCompanyAsync.fulfilled, (state, action) => {
        const companyIndex = state.companyData.findIndex((company) => company.code === action.payload.code);
        if(companyIndex !== -1) {
          state.companyData[companyIndex] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateCompanyAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Something went wrong in updateCompanyAsync';
      })

      .addCase(deleteCompanyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
        const companyCode = action.payload;
        state.companyData = state.companyData.filter((company) => company.code !== companyCode);
        state.status = 'succeeded';
      })
      .addCase(deleteCompanyAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Something went wrong in updateCompanyAsync';
      })
  },
});

export const selectCompanys = (state: RootState) => state.company.companyData;
export const selectAPIStatus = (state: RootState) => state.company.status;
export const selectAPIError = (state: RootState) => state.company.error;

export default companySlice.reducer;