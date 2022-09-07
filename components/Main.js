import React from 'react'
import { useSelector } from 'react-redux'
import EntryPage from './EntryPage'

export default function Main({
  filteredArray,
  searchInput,
  setOpen,
  setCurrentFollower,
  token,
  allFollowers,
  loading,
}) {
  const user = useSelector((state) => state.user.value)

  function compare(a, b) {
    if (a[0].display_name < b[0].display_name) {
      return -1
    }
    if (a[0].display_name > b[0].display_name) {
      return 1
    }
    return 0
  }

  function handleClick(follower) {
    if (follower[1].data.length != 0) {
      setOpen(true)
    }

    setCurrentFollower(follower)
  }

  return token ? (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4">
      {searchInput != ''
        ? filteredArray
            .filter((item) => item)
            .sort(compare)
            .map((item, index) => (
              <div
                className="flex flex-col w-5/6 sm:w-auto sm:min-w-1/5 bg-gradient-to-r from-purple-500 to-purple-800 rounded hover:from-blue-400 hover:to-blue-700 "
                key={index}
                onClick={() => handleClick(item)}
              >
                <div className="flex">
                  <img
                    className=" w-20 sm:w-24 rounded pl-1 pt-1 "
                    src={`${
                      loading
                        ? '/profile-default.png'
                        : item[0].profile_image_url
                    }`}
                  />
                  <div className="flex sm:flex-col items-center justify-center w-full">
                    <p className="self-center sm:w-full text-center font-semibold text-5xl text-white">
                      {`${item[1].data.length != 0 ? item[1].data.length : ''}`}
                    </p>
                    <p className="font-semibold text-xl text-white w-1/3 sm:w-32 text-center">{`${
                      item[1].data.length != 0
                        ? 'Recent VODs'
                        : 'No Recent VODs'
                    }`}</p>
                  </div>
                </div>

                <p className="font-bold  pl-2 text-lg tracking-wide">{item[0].login}</p>
              </div>
            ))
        : allFollowers
            .filter((item) => item)
            .sort(compare)
            .map((item, index) => (
              <div
                className="flex flex-col w-5/6 sm:w-auto sm:min-w-1/5 rounded bg-gradient-to-r from-purple-500 to-purple-800 hover:from-blue-400 hover:to-blue-700"
                key={index}
                onClick={() => handleClick(item)}
              >
                <div className="flex">
                  <img
                    className=" w-20 sm:w-24 rounded pl-1 pt-1 "
                    src={`${
                      loading
                        ? '/profile-default.png'
                        : item[0].profile_image_url
                    }`}
                  />
                  <div className="flex sm:flex-col items-center justify-center w-full">
                    <p className="self-center sm:w-full text-center font-semibold text-5xl text-white">
                      {`${item[1].data.length != 0 ? item[1].data.length : ''}`}
                    </p>
                    <p className="font-semibold text-xl text-white w-1/3 sm:w-32 text-center">{`${
                      item[1].data.length != 0
                        ? 'Recent VODs'
                        : 'No Recent VODs'
                    }`}</p>
                  </div>
                </div>

                <p className="font-bold  pl-2 text-lg tracking-wide">{item[0].login}</p>
              </div>
            ))}
    </div>
  ) : (
    <EntryPage />
  )
}
