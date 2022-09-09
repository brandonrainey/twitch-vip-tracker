import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useMediaQuery from '../hooks/useMediaQuery'

export default function Header({
  searchInput,
  handleChange,
  token,
  setToken,
}) {
  const router = useRouter()
  
  const connectedUser = useSelector((state) => state.user.followValue)

  const [connected, setConnected] = useState(false)

  const [buttonText, setButtontext] = useState(token ? connectedUser : 'Connect to Twitch')

  const isMobile = useMediaQuery('(max-width: 655px)')

  //checks for connection, then either connects for disconnects
  function handleClick() {

    if (connected) {
      setConnected(false)
      setToken(false)
      router.push('/')
    }
    if (!connected) {
      setConnected(true)
      router.push(
        'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=mz3oo6erk0hqgzs6o8ydh26c9m8u09&redirect_uri=http://localhost:3000/&scope=user%3Aread%3Afollows&state=c3ab8aa609ea11e793ae92361f002671'
      )
    }
  }

  //shows connected user in button
  useEffect(() => {
    if (token) {
      setConnected(true)
      setButtontext(connectedUser)
    }
  }, [connectedUser])

  useEffect(() => {
    isMobile ? setButtontext('Connect') : setButtontext('Connect to Twitch')
  }, [isMobile])

  

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center w-full">
        <p
          className="text-5xl font-bold pl-4 pt-4 pb-4 text-white cursor-pointer"
          onClick={() => handleClick()}
        >
          Twitch Follow Tracker
        </p>
        <button
          className="bg-purple-600 hover:bg-blue-500  px-4 rounded-2xl h-8 text-white font-bold text-center ml-auto mr-4 cursor-pointer text-lg tracking-wide "
          onClick={() =>
            handleClick()
          }
          
          onMouseOver={() => setButtontext(connected ? 'Disconnect' : 'Connect to Twitch')}
          onMouseLeave={() => setButtontext(token ? connectedUser : 'Connect to Twitch')}
        >
          {buttonText}
        </button>
      </div>
      <form className="w-full rounded border-none ml-10 mt-2 mb-2">
        <input
          className=" w-1/2 sm:w-1/4 rounded px-2 py-1 focus:outline-0"
          onChange={handleChange}
          value={searchInput}
          placeholder="Search"
          // onFocus={() => getPages()}
        ></input>
      </form>
    </div>
  )
}
