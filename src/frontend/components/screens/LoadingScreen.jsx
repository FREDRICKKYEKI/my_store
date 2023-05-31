import React from 'react'

export const LoadingScreen = ({ loading }) => {
  return (
    <>
      {loading && (
        <div class="overlay active" id="loading-overlay">
          Loading...
        </div>
      )}
    </>
  );
}
