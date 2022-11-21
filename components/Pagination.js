import React from 'react'

export default function Pagination({ page, handleNextPage, loading, token }) {
  return token ? (
    <div className="w-full flex justify-center my-6">
      <div
        className={`flex ${
          page ? 'border-2' : ''
        } border-white text-white rounded`}
      >
        <button
          className={`px-1 ${page ? '' : 'hidden'}`}
          onClick={() => handleNextPage()}
        >
          {page ? (loading ? 'Loading' : 'Load More') : ''}
        </button>
      </div>
    </div>
  ) : null
}
