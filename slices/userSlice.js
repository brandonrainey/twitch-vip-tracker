import React, { useState, useEffect } from 'react'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

let something = ''

if (typeof window !== 'undefined') {
  something = document?.location?.hash.slice(14, 44)
}

export const fetchData = createAsyncThunk('slices/fetchData', async () => {
  const response = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
      Authorization: `Bearer ${something}`,
    },
  })

  const response2 = await axios.get(
    `https://api.twitch.tv/helix/users/follows?from_id=${response.data.data[0].id}&first=100`,
    {
      headers: {
        'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
        Authorization: `Bearer ${something}`,
      },
    }
  )




  return [response, response2]
})



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: [],
    followValue: [],
    isFulfilled: false,
  },
  reducers: {
    setUserData: (state) => {
      
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload[1].data
      state.followValue = action.payload[0].data.data[0].login
      state.isFulfilled = true
    })
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer
