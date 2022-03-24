import React, { useContext, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider'

export const AppContext = React.createContext()

function AppProvider({children}) {
    const [isShowAddModal, setIsShowAddModal] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const { user } = useContext(AuthContext);
  /**
   * room
   * {
   * name,
   * description
   * members: [],
   * photoURL
   * }
   */
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);

  const rooms = useFirestore("rooms", roomsCondition);
  const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

    return (
        <AppContext.Provider value={{ rooms, isShowAddModal, setIsShowAddModal, selectedRoomId, setSelectedRoomId, selectedRoom }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;