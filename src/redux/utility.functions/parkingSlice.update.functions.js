// Helper function to update the state from the action

export const updateTheTimeSlot = (oldTimeSlots, newTimeSlot) => {
    const timeSlotPressed = oldTimeSlots.find(
        oldTimeSlot => oldTimeSlot === newTimeSlot
    )

    if (timeSlotPressed) {
        //If we have the time slot we will return the same array
        return oldTimeSlots.map(oldTimeSlot => 
            oldTimeSlot
        )
    }

    // If the time slot is not there then we will add the new time slot
    return [...oldTimeSlots, newTimeSlot]
}


export const deleteTheTimeSlot = (oldTimeSlotsArray, timeSlotToDel) => {
    return oldTimeSlotsArray.filter(oldTimeSlotItem => 
        oldTimeSlotItem !== timeSlotToDel
    )
}

export const updateTheTimeSlotDetails = (oldTimeSlotsDetails, newTimeSlotDetails) => {
    // If the time slot is not there then we will add the new time slot
    return [...oldTimeSlotsDetails, newTimeSlotDetails]
}