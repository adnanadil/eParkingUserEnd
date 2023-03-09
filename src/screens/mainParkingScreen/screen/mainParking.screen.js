import React from "react";
import { TouchableOpacity } from "react-native";

import { SafeArea } from "../../../Utility/SafeArea";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";

import { ParkingList } from "../components/parking-list.styles";
import { ParkingInfoCard } from "../components/parking-info-card.component";


const parkings = [
  {
    name: "Prince Mohammed Bin Fahd University",
    photo:
      "https://www.pmu.edu.sa/Attachments/Life_pmu/images/Gallery/PMU_History/PMU_History/fullscreen/17.jpg",
  },
  {
    name: "Mall Of Dhahran",
    photo:
      "https://www.biztoday.news/wp-content/uploads/2022/06/Mall-of-Dhahran-reopens-to-the-public.jpeg",
  },
  {
    name: "Othaim Mall",
    photo:
      "https://media.safarway.com/content/98af57b2-698b-464e-ada5-5f37e291c55c_sm.jpg",
  },
  {
    name: "Ithra",
    photo:
      "https://img.theculturetrip.com/wp-content/uploads/2019/01/rexfeatures_10035951b.jpg",
  },
];

export const MainParikingScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ParkingList
        data={parkings}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Indivdual Parking", {
                  parking: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ParkingInfoCard parking={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
