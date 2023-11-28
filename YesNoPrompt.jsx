import { Alert, Platform } from "react-native"

// Extends the Alert yes/no modal dialog box of React Native to provide web interface.
export default async function YesNoPrompt(titleShortLarge, detailsText) {
  let isYes = false

  if (Platform.OS === "web") {
    isYes = window.confirm(detailsText)
  } else {
    isYes = await AsyncAlert(titleShortLarge, detailsText)
  }
  console.log("leaving isYes", isYes)
  return isYes
}

function AsyncAlert(titleShortLarge, detailsText) {
  return new Promise((resolve, reject) => {
    Alert.alert(
      titleShortLarge,
      detailsText,
      [
        {
          text: "Yes",
          onPress: () => resolve(true)
        },
        {
          text: "No",
          onPress: () => resolve(false)
        }
      ],
      { cancelable: false }
    )
  })
}
