import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ColorResponse } from '../../types/product.response.interface';

const { width } = Dimensions.get('window');

interface Props {
  variants: ColorResponse[];
  selectedColor: ColorResponse;
  onSelectColor: (variant: ColorResponse) => void;
}

export const ColorSelector: React.FC<Props> = ({ variants, selectedColor, onSelectColor }) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Color: <Text style={{ fontWeight: '700' }}>{selectedColor.colorName}</Text></Text>
      <View style={styles.colorContainer}>
        {variants.map((variant) => (
          <TouchableOpacity
            key={variant.colorID}
            style={[
              styles.colorOption,
              selectedColor.colorID === variant.colorID && styles.colorSelected,
            ]}
            onPress={() => onSelectColor(variant)}
          >
            <View 
              style={[
                styles.colorView, 
                { backgroundColor: variant.hexCode }
              ]} 
            />
            <Text style={styles.colorLabel}>{variant.colorName}</Text>
            {/* <Text style={styles.colorPrice}>${variant.price.toFixed(2)}</Text> */}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginTop: 20, marginBottom: 8 },
  colorContainer: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorOption: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: width / 4.5,
  },
  colorSelected: { borderColor: 'black', borderWidth: 2 },
  colorView: { width: 60, height: 60, borderRadius: 8, marginBottom: 5 },
  colorLabel: { fontSize: 13, fontWeight: '500', color: '#2D3748' },
  colorPrice: { fontSize: 13, color: 'black', fontWeight: '600' },
});