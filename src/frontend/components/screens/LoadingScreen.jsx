import React from 'react'
import { useAppContext } from '../../../contexts/AppContext';

export const LoadingScreen = () => {
	const { loading } = useAppContext()
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
