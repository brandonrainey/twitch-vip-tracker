import React from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()


  return (
    <div className="flex items-center">
      <p className="text-4xl font-bold pl-4 pt-4">Twitch Follow Tracker</p>
      <div
        className="bg-purple-500 w-36 p-1 rounded-2xl h-8 text-white font-bold text-center ml-auto mr-4"
        onClick={() =>
          router.push(
            'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=mz3oo6erk0hqgzs6o8ydh26c9m8u09&redirect_uri=http://localhost:3000&scope=user%3Aread%3Afollows&state=c3ab8aa609ea11e793ae92361f002671'
          )
        }
      >
        {'Connect to Twitch'}
      </div>
    </div>
  )
}
