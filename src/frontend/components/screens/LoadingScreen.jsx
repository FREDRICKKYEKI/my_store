import React from 'react'
import { useAppContext } from '../../../contexts/AppContext';

export const LoadingScreen = () => {
	const { loading } = useAppContext()
  return (
    <>
      {loading && (
        <div className="overlay active" id="loading-overlay">
          Loading...
        </div>
      )}
    </>
  );
}
