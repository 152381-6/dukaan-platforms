import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// تسجيل الدخول
export const login = createAsyncThunk(
  'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
              const config = {
                      headers: {
                                'Content-Type': 'application/json'
                                        }
                                              };
                                                    
                                                          const { data } = await axios.post(
                                                                  '/api/auth/login',
                                                                          { email, password },
                                                                                  config
                                                                                        );
                                                                                              
                                                                                                    localStorage.setItem('userToken', data.token);
                                                                                                          return data;
                                                                                                              } catch (error) {
                                                                                                                    return rejectWithValue(error.response.data);
                                                                                                                        }
                                                                                                                          }
                                                                                                                          );

                                                                                                                          const authSlice = createSlice({
                                                                                                                            name: 'auth',
                                                                                                                              initialState: {
                                                                                                                                  userInfo: null,
                                                                                                                                      loading: false,
                                                                                                                                          error: null
                                                                                                                                            },
                                                                                                                                              reducers: {
                                                                                                                                                  logout: (state) => {
                                                                                                                                                        localStorage.removeItem('userToken');
                                                                                                                                                              state.userInfo = null;
                                                                                                                                                                    state.error = null;
                                                                                                                                                                        }
                                                                                                                                                                          },
                                                                                                                                                                            extraReducers: (builder) => {
                                                                                                                                                                                builder
                                                                                                                                                                                      .addCase(login.pending, (state) => {
                                                                                                                                                                                              state.loading = true;
                                                                                                                                                                                                      state.error = null;
                                                                                                                                                                                                            })
                                                                                                                                                                                                                  .addCase(login.fulfilled, (state, action) => {
                                                                                                                                                                                                                          state.loading = false;
                                                                                                                                                                                                                                  state.userInfo = action.payload;
                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                              .addCase(login.rejected, (state, action) => {
                                                                                                                                                                                                                                                      state.loading = false;
                                                                                                                                                                                                                                                              state.error = action.payload?.msg || 'Login failed';
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                      export const { logout } = authSlice.actions;
                                                                                                                                                                                                                                                                      export default authSlice.reducer;