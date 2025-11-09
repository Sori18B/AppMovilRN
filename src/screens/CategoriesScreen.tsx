import * as React from 'react';
import { View } from 'react-native';
import { Categories } from '../components/home';

export default function CategoriesScreen({ navigation }: any) {
  return (
    <View>

      <Categories isShort={false} onPressCategory={ (Id) => navigation.navigate('ProductList', { categoryID: Id }) }/>

    </View>
  );
}