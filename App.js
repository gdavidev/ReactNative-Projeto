import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Menu from './Screens/Menu';
import Pokedex from './Screens/Pokedex';
import PokemonDetail from './Screens/PokemonDetail';
import Favorites from './Screens/Favorites';
import Itens from './Screens/Itens';
import ItemDetail from './Screens/ItemDetail';
import Locations from './Screens/Locations';
import LocationDetail from './Screens/LocationDetail';
import Trainers from './Screens/Trainers';
import Generations from './Screens/Generations';
import Info from './Screens/Info';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Splash">
        <Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: true }}
        />
        <Screen
          name="PokemonDetail"
          component={PokemonDetail}
          options={{ headerShown: true }}
        />
        <Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: true }}
        />
        <Screen
          name="Itens"
          component={Itens}
          options={{ headerShown: true }}
        />
        <Screen
          name="ItemDetail"
          component={ItemDetail}
          options={{ headerShown: true }}
        />
        <Screen
          name="Locais"
          component={Locations}
          options={{ headerShown: true }}
        />
        <Screen
          name="LocationDetail"
          component={LocationDetail}
          options={{ headerShown: true }}
        />
        <Screen
          name="Trainers"
          component={Trainers}
          options={{ headerShown: true }}
        />
        <Screen
          name="Generations" // Exibe tela de gerações primeiro
          component={Generations}
          options={{ headerShown: true }}
        />
        <Screen
          name="Info"
          component={Info}
          options={{ headerShown: true }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
