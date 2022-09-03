import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

export default function Header({
  searchInput,
  handleChange,
  something,
  getPages,
}) {
  const router = useRouter()
  const connectedUser = useSelector((state) => state.user.followValue)

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center w-full">
        <p className="text-5xl font-bold pl-4 pt-4 pb-4 text-white">
          Twitch Follow Tracker
        </p>
        <button
          className="bg-purple-600 w-40 p-1 rounded-2xl h-8 text-white font-bold text-center ml-auto mr-4 cursor-pointer"
          onClick={() =>
            router.push(
              'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=mz3oo6erk0hqgzs6o8ydh26c9m8u09&redirect_uri=https://mytwitchfollows.netlify.app/&scope=user%3Aread%3Afollows&state=c3ab8aa609ea11e793ae92361f002671'
            )
          }
          disabled={something}
        >
          {`${something ? connectedUser : 'Connect to Twitch'}`}
        </button>
      </div>
      <form className="w-full rounded border-none ml-10 mt-2 mb-2">
        <input
          className="w-1/4 rounded px-2 py-1 focus:outline-0"
          onChange={handleChange}
          value={searchInput}
          placeholder="Search"
          // onFocus={() => getPages()}
        ></input>
      </form>
    </div>
  )
}
