import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Diary from '../scenes/diary/diary';
import Calendar from '../scenes/calendar/calendar';
import DiarySvg from '../../assets/svg/diary.svg';
import CalendarSvg from '../../assets/svg/calendar.svg';
import localStorage from '../utils/localStorage';
import logEvents from '../services/logEvents';
import {colors} from '../utils/colors';
import Icon from '../components/Icon';
import PlusModal from '../scenes/diary/plus-modal';

const Tab = createMaterialTopTabNavigator();

const Tabs = ({navigation, route}) => {
  const [plusModalVisible, setPlusModalVisible] = useState(false);

  const handlePlus = async () => {
    const isBeckActivated = await localStorage.getIsBeckActivated();
    if (isBeckActivated) return setPlusModalVisible(true);
    startSurvey();
  };

  const startSurvey = async () => {
    const symptoms = await localStorage.getSymptoms();
    logEvents.logFeelingStart();
    if (!symptoms) {
      navigation.navigate('symptoms', {
        showExplanation: true,
        redirect: '0',
      });
    } else {
      navigation.navigate('question', {index: 0});
    }
  };

  return (
    <>
      <PlusModal
        visible={plusModalVisible}
        navigation={navigation}
        onClick={() => setPlusModalVisible(false)}
        onChange={(e) => console.log(e)}
        startSurvey={startSurvey}
      />
      <SafeAreaView style={styles.surveyButton}>
        <Icon
          activeOpacity={0.9}
          icon="PlusSvg"
          onPress={handlePlus}
          width={50}
          height={50}
        />
      </SafeAreaView>
      <Tab.Navigator
        initialRouteName="Diary"
        swipeEnabled={true}
        tabBarPosition="bottom"
        tabBarOptions={{
          activeTintColor: '#26387C',
          inactiveTintColor: '#E5E5E5',
          showIcon: true,
          indicatorStyle: {height: 0},
          style: styles.tabBar,
          labelStyle: {
            textTransform: 'capitalize',
            fontSize: 11,
            marginHorizontal: 0,
            marginVertical: Platform.OS === 'android' ? 0 : 5,
            padding: 0,
          },
        }}>
        <Tab.Screen
          name="Diary"
          component={Diary}
          options={{
            tabBarLabel: 'Journal',
            tabBarIcon: ({color}) => <DiarySvg style={{color}} />,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: 'Calendrier',
            tabBarIcon: ({color}) => <CalendarSvg style={{color}} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderColor: colors.LIGHT_BLUE,
    borderWidth: 1,
    maxHeight: 80,
  },
  surveyButton: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 40 : 50,

    zIndex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: Platform.OS === 'android' ? 5 : 17,
    fontWeight: '700',
  },
});

export default Tabs;
