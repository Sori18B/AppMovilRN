import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SizeResponse } from '../../types/product.response.interface';

interface Props {
  sizes: SizeResponse[];
  selectedSize: SizeResponse;
  onSelectSize: (size: SizeResponse) => void;
}

export const SizeSelector: React.FC<Props> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Talla: <Text style={{ fontWeight: '700' }}>{selectedSize.sizeLabel}</Text></Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size.sizeID}
            style={[
              styles.sizeBox,
              selectedSize.sizeID === size.sizeID && styles.sizeSelected,
            ]}
            onPress={() => onSelectSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize.sizeID === size.sizeID && styles.sizeTextSelected,
              ]}
            >
              {size.sizeLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginTop: 20, marginBottom: 8 },
  sizeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sizeBox: {
    width: 55, height: 45, borderRadius: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff',
  },
  sizeSelected: { borderColor: 'black', borderWidth: 2 },
  sizeText: { fontSize: 15, color: '#2D3748' },
  sizeTextSelected: { color: 'black', fontWeight: '700' },
});