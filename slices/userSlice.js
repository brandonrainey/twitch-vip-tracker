import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let token = ''

if (typeof window !== 'undefined') {
  token = document?.location?.hash.slice(14, 44)
}

export const fetchData = createAsyncThunk('slices/fetchData', async () => {
  const response = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
      Authorization: `Bearer ${token}`,
    },
  })

  const response2 = await axios.get(
    `https://api.twitch.tv/helix/users/follows?from_id=${response.data.data[0].id}&first=100`,
    {
      headers: {
        'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return [response.data, response2.data]
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: [],
    followValue: [],
    isFulfilled: false,
    userId: '',
  },
  reducers: {
    setUserData: (state) => {},
  },
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload[1]
      state.followValue = action.payload[0].data[0].login
      state.isFulfilled = true
      state.userId = action.payload[0].data[0].id
    })
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer
