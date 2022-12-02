import { useState, createContext } from 'react';
export const UserContext = createContext(null);

const Provider = ({ children }) => {
  //user context
  const [userData, setUserData] = useState(null);
  const [favIds, setFavIds] = useState([]);
  const [entertainmentIds, setEntertainmentIds] = useState([]);
  const [completeIds, setCompleteIds] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        favIds,
        setFavIds,
        entertainmentIds,
        setEntertainmentIds,
        completeIds,
        setCompleteIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
