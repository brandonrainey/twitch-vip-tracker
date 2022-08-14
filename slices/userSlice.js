import React from 'react'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('slices/fetchData', async () => {
  const response = await axios.get('https://api.twitch.tv/helix/games/top', {
        headers: {
          'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
          Authorization: `Bearer maxfbvevlajdpefvtm5xngl479luox`,
        }
      })
      return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: []
  },
  reducers: {
    setUserData: (state) => {
      
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      
      state.value = [...action.payload.data]
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer