import React, { useEffect, useRef, useState } from 'react'

export default function Vods({ open, setOpen, currentFollower }) {
  const [page, setPage] = useState()
  const vodsLightbox = useRef()

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

  //SET UP PAGINATION COUNTER SO WHEN IF PAGINATION OBJECT EXISTS, THEN INCREASE COUNTER AND FETCH NEW LIST

  return (
    <div className="flex  w-full h-full bg-black/50 absolute z-20">
      <div
        className="flex flex-col bg-blue-200 h-5/6 w-3/4 fixed top-lightbox left-lightbox rounded -mt-14 "
        ref={vodsLightbox}
      >
        <p className="w-full text-center text-6xl mt-10 mb-6 font-bold">
          {currentFollower[0].display_name}
        </p>

        <div
          className={`flex flex-wrap md:flex-row justify-center item-center gap-10 overflow-auto ${
            currentFollower[1].data.length == 3 ? 'h-full' : 'h-auto'
          }`}
        >
          {currentFollower[1].data.map((item, index) => (
            <div className="flex flex-col flex-wrap items-center justify-end" key={index}>
              <p className="w-80 self-center text-center font-semibold ">
                {item.title}
              </p>
              <a href={item.url}>
                <img
                  className="max-h-60 mt-auto shadow-xl"
                  src={`${
                    item.thumbnail_url
                      ? item.thumbnail_url
                          .replace('%{width}', '1920')
                          .replace('%{height}', '1080')
                      : '/no-thumbnail.png'
                  }`}
                />
              </a>
              <div className="text-center font-semibold">
                {handleDate(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
