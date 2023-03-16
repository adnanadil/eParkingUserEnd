import { useEffect, useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { useSelector } from "react-redux";

export default PickerComponent = () => {
  const parkingLots = useSelector((state) => state.firestoreSlice.parkingLots);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Banana", value: "banana" },
    { label: "Banana", value: "banana" },
  ]);

  useEffect(() => {
    console.log(
      `This is the size of the query result array: ${JSON.stringify(
        parkingLots,
        null,
        2
      )}`
    );

    //create a array of objects with names as label and
    // UID as value.
  });

  return (
    <View style={{ minHeight: 100, zIndex: -1 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select A Parking Lot"
        backgroundColor="#dfdfdf"
      />
    </View>
  );
};
