import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const LoadingIndicatorCustom = styled(ActivityIndicator).attrs({
    size: 128,
    animating: true,
    // color: Colors.blue300,
  })`
    position: absolute;
    top: 50%;
    left: 35%;
    z-index: 999;
  `;