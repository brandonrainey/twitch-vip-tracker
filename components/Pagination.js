import React from 'react'

export default function Pagination({ page, setPage, handleNextPage, handlePreviousPage }) {
  return (
    <div className='w-full flex justify-center my-6'>
        <div className='flex border border-white text-white rounded'>
            <button className='px-1' onClick={() => handlePreviousPage()}>Previous</button>
            <div className='border-x px-1'>
                {page}24
            </div>
            <button className='px-1' onClick={() => handleNextPage()}>Next</button>
        </div>
    </div>
  )
}
