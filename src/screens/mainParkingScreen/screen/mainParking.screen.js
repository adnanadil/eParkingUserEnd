import React from "react";
import { TouchableOpacity } from "react-native";

import { SafeArea } from "../../../Utility/SafeArea";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";

import { RestaurantList } from "../components/restaurant-list.styles";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

// const restaurants = ["ALBA", "Dalba", "Chulba"]

const restaurants = [
  
  {
    name: "Prince Mohammed Bin Fahd University",
    photo:
      "https://www.pmu.edu.sa/Attachments/Life_pmu/images/Gallery/PMU_History/PMU_History/fullscreen/17.jpg",
    // photo: "https://parklio.com/assets/img/blog/100003/the-best-solution-for-parking-protection_1657283968214.jpg",
  },
  {
    name: "Mall Of Dhahran",
    photo:
      "https://www.biztoday.news/wp-content/uploads/2022/06/Mall-of-Dhahran-reopens-to-the-public.jpeg",
    // photo: "https://parklio.com/assets/img/blog/100003/the-best-solution-for-parking-protection_1657283968214.jpg",
  },
  {
    name: "Othaim Mall",
    photo:
      "https://media.safarway.com/content/98af57b2-698b-464e-ada5-5f37e291c55c_sm.jpg",
    // photo: "https://parklio.com/assets/img/blog/100003/the-best-solution-for-parking-protection_1657283968214.jpg",
  },
  {
    name: "Ithra",
    photo:
      "https://img.theculturetrip.com/wp-content/uploads/2019/01/rexfeatures_10035951b.jpg",
    // photo: "https://parklio.com/assets/img/blog/100003/the-best-solution-for-parking-protection_1657283968214.jpg",
  },
];

export const MainParikingScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Indivdual Parking", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
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