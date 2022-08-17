import React from 'react'

export default function Main({ followerData }) {
    console.log(followerData)
  return (
    <div className='flex flex-wrap gap-1'>
        {followerData.filter(item => item).map((item) => (
        <div className='flex'>
            <img src={`${item.profile_image_url}`}/>
          <p>{item.login}</p>
        </div>
      )

      )}
    </div>
  )
}
