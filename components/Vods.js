import React, { useEffect, useRef } from 'react'

export default function Vods({ open, setOpen, currentFollower }) {
  console.log(currentFollower)

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

  useEffect(() => {
    const created = new Date()
  }, [currentFollower])

  return (
    <div className="flex  w-full h-full bg-black/50 absolute z-20 ">
      <div
        className="flex flex-col bg-gray-200 h-3/4 w-3/4 fixed top-lightbox left-lightbox"
        ref={vodsLightbox}
      >
        <p className="w-full text-center text-6xl">
          {currentFollower[0].display_name}
        </p>
        <div className="flex justify-center gap-10 mt-10">
          {currentFollower[1].data.map((item) => (
            <div className="flex flex-col">
              <p className="w-60 self-center text-center font-semibold mt-auto">
                {item.title}
              </p>
              <a href={item.url}>
                <img
                  className="max-h-40 mt-auto"
                  src={`${item.thumbnail_url
                    .replace('%{width}', '1920')
                    .replace('%{height}', '1080')}`}
                />
              </a>
              <div>{handleDate(item)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
