import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateInvoice, deleteInvoice } from '../database/Database';

const DetailsScreen = ({ route, navigation }) => {
  const { invoice } = route.params;
  const [productName, setProductName] = useState(invoice.product_name);
  const [quantity, setQuantity] = useState(invoice.quantity.toString());
  const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoice_number);
  const [value, setValue] = useState(invoice.value.toString());
  const [paymentMethod, setPaymentMethod] = useState(invoice.payment_method);

  const handleUpdate = () => {
    updateInvoice(invoice.id, productName, quantity, invoiceNumber, value, paymentMethod);
    Alert.alert('Nota fiscal atualizada com sucesso');
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    Alert.alert('Nota fiscal deletada com sucesso');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Detalhes da Nota Fiscal</Text>
      <TextInput
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Número da Nota"
        value={invoiceNumber}
        onChangeText={setInvoiceNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Metódo de pagamento"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
        style={styles.input}
      />
      <Button title="Atualizar Nota Fiscal" onPress={handleUpdate} />
      <Button title="Excluir Nota Fiscal" onPress={handleDelete} color="red" />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default DetailsScreen;
