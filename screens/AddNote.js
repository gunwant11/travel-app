import {
  Button,
  Container,
  HStack,
  Input,
  Modal,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import EmojiPicker from "rn-emoji-keyboard";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAppContext from "../store/userContext";
import Layout from "../components/Wlayout";
import Imagepicker from "../components/Imagepicker";
import { Storage } from "aws-amplify";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { formatDateObject } from "../utils/ui-utils";
export default function AddNote() {
  const richText = useRef();

  const navigation = useNavigation();
  const route = useRoute();
  const {
    createJourney,
    updateJourney,
    updateJourneyLoading,
    deleteJourney,
    deleteJourneyLoadingState,
    getJourney,
  } = useAppContext();
  const [descHTML, setDescHTML] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(formatDateObject(moment().format('YYYY-MM-DD')));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const selectedJourney = route?.params?.selectedJourney;
  const [selectedJourneyId, setSelectedJourneyId] = useState();

  const [mood, setMood] = useState({
    emoji: "😃",
    name: "grinning face with big eyes",
    slug: "grinning_face_with_big_eyes",
    toneEnabled: false,
    unicode_version: "0.6",
  });
  const [moodPickerVisible, setMoodPickerVisible] = useState(false);

  const [image, setImage] = useState();
  const [imageKey, setImageKey] = useState();

  useEffect(() => {
    if (route?.params?.selectedJourney) {
      setTitle(selectedJourney.title);
      setDescHTML(selectedJourney?.descHTML);
      setSelectedJourneyId(selectedJourney.journeyId);
      if (selectedJourney.descHTML)
        richText.current?.setContentHTML(selectedJourney.descHTML);
      setDate(selectedJourney?.createdAt);
    }

    return () => {
      setDescHTML("");
      setTitle("");
    };
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarVisible: false,
    });
  }, [navigation]);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setDescHTML(descriptionText);
    } else {
      setDescHTML("");
    }
  };

  const uploadImage = async (filename, img) => {
    const res = await Storage.put(filename, img, {
      contentType: "image/png",
      level: "public",
    });
    console.log(res, "res");
    await setImageKey(res.key);
    return res.key;
  };

  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      return;
    } else {
      // send data to your server!
      const description = replaceWhiteSpace.slice(0, 100);
      let imageUrl;
      if (image?.filename && image?.file) {
        imageUrl = await uploadImage(image.filename, image.file);
      }

      createJourney(
        title,
        description,
        replaceWhiteSpace,
        descHTML,
        mood,
        imageUrl,
        date,
        () => {
          console.log("journey created");
        }
      );
    }
  };

  const handleDelete = () => {
    deleteJourney(selectedJourneyId, date, () => {
      getJourney();
      navigation.navigate("Journal");
    });
  };

  return (
    <Layout>
    {/* <Container> */}
      <View px={5} mt={8} h="full" width="100%">
        <HStack justifyContent="space-between" alignItems="center" w="full">
          <Icon
            name="arrowleft"
            size={30}
            color="#1A1D21"
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#ffffff70" , padding: 5, borderRadius: 50 }}
          />
          <HStack space={3} alignItems="center">
            <Imagepicker setImage={setImage} uploadImage={uploadImage} />
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" size={23} color="#1A1D21" />
            </TouchableOpacity>
            <Button py={2} px={4} onPress={submitContentHandle} bg="#5a5190" >
              <Text py={0} fontWeight="700" color="#f2f2f2">
                Save
              </Text>
            </Button>
          </HStack>
        </HStack>
        <View pt={3}>
          <HStack
            h="12"
            w="full"
            justifyContent="space-between"
            space={4}
            alignItems="center"
          >
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <HStack alignItems="center" space={3}>
                <VStack>
                  <Text fontWeight="700" fontSize="4xl" p={0} m={0}>
                    {date.date}
                  </Text>
                  <View
                    borderBottomWidth={6}
                    borderBottomColor="#5a51906b"
                    width="100%"
                    position="absolute"
                    bottom={1.5}
                  />
                </VStack>
                <VStack position="relative" top={1}>
                  <Text fontSize="xs" fontWeight="700">
                    {date.month} {date.year}
                  </Text>
                  <Text fontSize="xs" fontWeight="700">{date.day}</Text>
                </VStack>
                <Icon name="caretdown" size={15} color="#1A1D21" />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMoodPickerVisible(true)}>
              <Text
                color="#717676"
                fontSize={27}
                py={0.5}
                px={1.5}
                borderRadius={55}
                bg="#b2aed1"
              >
                {mood?.emoji}
              </Text>
            </TouchableOpacity>
          </HStack>
          <Input
            value={title}
            onChangeText={setTitle}
            p={0}
            pt={2}
            placeholder="Title "
            borderRadius={0}
            fontSize='3xl'
            variant="unstyled"
            fontFamily="mono"
            fontWeight="700"
            color="#1A1D21"
          />
        </View>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginTop: 10,
            }}
          />
        )}
   
        <View style={styles.richTextContainer}>
          <ScrollView>
            <RichEditor
              ref={richText}
              onChange={richTextHandle}
              placeholder="Write your cool content here :)"
              androidHardwareAccelerationDisabled={true}
              style={styles.richTextEditorStyle}
              initialHeight={400}
              editorStyle={{
                color: "#1A1D21",
                backgroundColor: "transparent",
                fontSize: 16,
                lineHeight: 24,
              }}
              onHeightChange={(height) => {
                scrollToInput(ReactNative.findNodeHandle(richText.current));
              }}
            />
          </ScrollView>
        </View>
        <RichToolbar
          editor={richText}
          selectedIconTint="#873c1e"
          iconTint="#000"
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.checkboxList,
            actions.undo,
          ]}
          style={styles.richTextToolbarStyle}
        />
      </View>
      <EmojiPicker
          onEmojiSelected={(e) => setMood(e)}
          open={moodPickerVisible}
          onClose={() => setMoodPickerVisible(false)}
        />
      <Modal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        size="lg"
      >
        {/* datepicker */}
        <Calendar
          onDayPress={(day) => {
            console.log(day);
            setDate(formatDateObject(day.dateString));
            setShowDatePicker(false);
          }}
        />
      </Modal>
      {/* </Container> */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    backgroundColor: "transparent",
    color: "#1A1D21",
    borderColor: "#c6c3b3",
    borderRadius: 10,
  },

  richTextToolbarStyle: {
    backgroundColor: "#fff",
    color: "#000",
    borderColor: "#c6c3b3",
    borderRadius: 10,
    marginBottom: 20,
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },

  errorTextStyle: {
    // color: "#FF0000",
    marginBottom: 10,
  },
});
