import React, { useContext, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider'

export const AppContext = React.createContext()

function AppProvider({children}) {
    const [isShowAddGroupModal, setIsShowAddGroupModal] = useState(false);
    const [isShowAddMemberModal, setIsShowAddMemberModal] = useState(false)
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

  const membersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members
    }
  },[selectedRoom.members])
  const membersInSelectedRoom = useFirestore('users',membersCondition)

  const membersNotInCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'not-in',
      compareValue: selectedRoom.members
    }
  },[selectedRoom.members])
  const memberNotInSelectedRoom = useFirestore('users',membersNotInCondition)

    return (
        <AppContext.Provider value={{memberNotInSelectedRoom, rooms,isShowAddMemberModal,setIsShowAddMemberModal, isShowAddGroupModal, membersInSelectedRoom, setIsShowAddGroupModal, selectedRoomId, setSelectedRoomId, selectedRoom }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;