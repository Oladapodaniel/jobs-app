import { useState } from "react"
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Stack, useRouter } from "expo-router"
import { COLORS, icons, images, SIZES } from "../constants"
import { Popularjobs, Nearbyjobs, ScreenHeaderBtn, Welcome } from "../components"
import  * as ImagePicker from "expo-image-picker"

const Home = () => {
    const router = useRouter();
    const [ searchTerm, setSearchTerm ] = useState("")

    const imagePickerFromDevice = async() => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(status);

        let result = await ImagePicker.launchCameraAsync({
        // let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          console.log(result);
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
                headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />,
                headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Welcome 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                          if (searchTerm) {
                            router.push(`/search/${searchTerm}`)
                          }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={imagePickerFromDevice}>
                    <Text>Image Picker</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home;