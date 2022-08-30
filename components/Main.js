import React, { useEffect } from 'react'

export default function Main({
  followerData,
  filteredArray,
  setFilteredArray,
  searchInput,
  setSearchInput,
  open,
  setOpen,
  currentFollower,
  setCurrentFollower,
}) {
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

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4">
      {searchInput != ''
        ? filteredArray
            .filter((item) => item)
            .sort(compare)
            .map((item, index) => (
              <div
                className="flex flex-col sm:min-w-1/5  bg-blue-600 rounded hover:bg-blue-500"
                key={index}
                onClick={() => handleClick(item)}
              >
                <div className="flex">
                  <img
                    className=" w-20 sm:w-24 rounded pl-1 pt-1 "
                    src={`${item[0].profile_image_url}`}
                  />
                  <div className="flex flex-col items-center justify-center w-full">
                    <p className="self-center w-full text-center font-semibold text-5xl text-white">
                      {`${item[1].data.length != 0 ? item[1].data.length : ''}`}
                    </p>
                    <p className="font-semibold text-xl text-white w-32 text-center">{`${
                      item[1].data.length != 0
                        ? 'Recent VODs'
                        : 'No Recent VODs'
                    }`}</p>
                  </div>
                </div>

                <p className="font-bold  pl-2 text-lg">{item[0].login}</p>
              </div>
            ))
        : followerData
            .filter((item) => item)
            .sort(compare)
            .map((item, index) => (
              <div
                className="flex flex-col sm:min-w-1/5  bg-purple-500 rounded hover:bg-blue-400"
                key={index}
                onClick={() => handleClick(item)}
              >
                <div className="flex">
                  <img
                    className=" w-20 sm:w-24 rounded pl-1 pt-1 "
                    src={`${item[0].profile_image_url}`}
                  />
                  <div className="flex flex-col items-center justify-center w-full">
                    <p className="self-center w-full text-center font-semibold text-5xl text-white">
                      {`${item[1].data.length != 0 ? item[1].data.length : ''}`}
                    </p>
                    <p className="font-semibold text-xl text-white w-32 text-center">{`${
                      item[1].data.length != 0
                        ? 'Recent VODs'
                        : 'No Recent VODs'
                    }`}</p>
                  </div>
                </div>

                <p className="font-bold  pl-2 text-lg">{item[0].login}</p>
              </div>
            ))}
    </div>
  )
}
