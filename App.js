import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Pressable, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useCardAnimation } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={style.homeContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Popup')} style={style.homeButton}>
        <Text>show pop up</Text>
      </TouchableOpacity>
    </View>
  );
};

const Popup = ({ navigation }) => {
  const { current } = useCardAnimation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Pressable
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: SCREEN_HEIGHT * 0.8,
          backgroundColor: '#F2E1AC',
          transform: [
            {
              scaleY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp'
              })
            }
          ]
        }}>
        {/* InnerContainer */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={style.popupButton}>
            <Text>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        cardStyle={{ backgroundColor: 'transparent' }}
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Group>
          <Stack.Screen name={`Home`} component={Home} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name={`Popup`}
            component={Popup}
            options={{
              cardStyle: {
                backgroundColor: '#00000033'
              },
              presentation: 'transparentModal',
              gestureResponseDistance: SCREEN_HEIGHT * 0.9,
              gestureVelocityImpact: 0.5, // default 0.3,
              animationEnabled: true,
              gestureEnabled: true,
              cardOverlayEnabled: true
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const style = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#F27D52',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeButton: {
    backgroundColor: '#F2E1AC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  popupButton: {
    backgroundColor: '#F26E22',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  }
});
