import { useState, createContext } from 'react';
export const MediaContext = createContext(null);

const MediaProvider = ({ children }) => {
  //user context
  const [movieData, setMovieData] = useState(null);
  const [showData, setShowData] = useState(null);
  const [gameData, setGameData] = useState(null);

  return (
    <MediaContext.Provider
      value={{
        movieData,
        setMovieData,
        showData,
        setShowData,
        gameData,
        setGameData,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
