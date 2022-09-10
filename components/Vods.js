import React, { useEffect, useRef, useState } from 'react'

export default function Vods({ open, setOpen, currentFollower, loading }) {
  const [page, setPage] = useState()

  const vodsLightbox = useRef()

  const bgImage = currentFollower[0].offline_image_url

  const closeOpenMenus = (e) => {
    if (open && !vodsLightbox.current.contains(e.target)) {
      setOpen(false)
    }
  }

  function handleDate(item) {
    return new Date(item.created_at).toString().substring(0, 15)
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus)

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className="flex  w-full h-full bg-black/50 absolute z-20">
      <div
        className={`flex flex-col bg-blue-200 h-5/6 xl:h-auto  sm:w-3/4 fixed top-lightbox sm:left-lightbox2 rounded -mt-14 pb-4`}
        ref={vodsLightbox}
      >
        <p className="w-full text-center text-5xl sm:text-6xl mt-6 mb-4 font-bold truncate h-20">
          {currentFollower[0].display_name}
        </p>

        <div
          className={`flex flex-wrap md:flex-row justify-center item-center gap-10 overflow-auto ${
            currentFollower[1].data.length == 3 ? 'h-full' : 'h-auto'
          }`}
        >
          {currentFollower[1].data.map((item, index) => (
            <div className="flex flex-col" key={index}>
              <div className="h-full"></div>

              <div className="flex flex-col flex-wrap items-center justify-center px-1">
                <p className="md:w-80 w-auto self-center text-center font-semibold  sm:p-0">
                  {item.title}
                </p>
                <a href={item.url}>
                  <img
                    className="max-h-60 mt-auto shadow-xl rounded "
                    src={`${
                      item.thumbnail_url
                        ? item.thumbnail_url
                            .replace('%{width}', '1920')
                            .replace('%{height}', '1080')
                        : '/no-thumbnail.png'
                    }`}
                    alt='vod thumbnail'
                  />
                </a>
                <div className="text-center font-semibold">
                  {handleDate(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
