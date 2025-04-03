import React from 'react'

function Loading() {
  return (
    <div className='bg-primary p-4 rounded-lg shadow-lg text-center text-red-600 font-dancingScript text-6xl px-10 py-5'>
      <h5 className="loading-text">Loading. . .</h5>
      <style jsx>{`
        .loading-text {
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Loading


// this code by my own knowledge and experience. I have not copied it from any source.