export const updateTheTimeSlot = (oldTimeSlots, newTimeSlot) => {
    // return [{car: "mycar"}, {car: "mycar"}, {car: "mycar"}]
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
    // console.log(`We are hitting this end point ${[...oldTimeSlotsDetails]}`)
    // If the time slot is not there then we will add the new time slot
    // console.log(`Hitting this end point ${JSON.stringify([...oldTimeSlotsDetails, newTimeSlotDetails], null, 2)} and ${JSON.stringify(newTimeSlotDetails, null, 2)}`)
    return [...oldTimeSlotsDetails, newTimeSlotDetails]
}