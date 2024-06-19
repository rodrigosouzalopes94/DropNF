import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createTables, addInvoice, getInvoices } from '../database/Database';

const HomeScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [value, setValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    createTables();
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    getInvoices(setInvoices);
  };

  const handleAddInvoice = () => {
    if (!productName || !quantity || !invoiceNumber || !value || !paymentMethod) {
      Alert.alert('Preencha todos os campos da Nota Fiscal');
      return;
    }

    addInvoice(productName, quantity, invoiceNumber, value, paymentMethod);
    Alert.alert('Nota Fiscal cadastrada corretamente');
    // Clear the fields
    setProductName('');
    setQuantity('');
    setInvoiceNumber('');
    setValue('');
    setPaymentMethod('');
    fetchInvoices();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Mostrar notas lançadas', { invoice: item })}
    >
      <Text>{item.product_name}</Text>
      <Text>{item.invoice_number}</Text>
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Add Invoice</Text>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChangeText={setInvoiceNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
        style={styles.input}
      />
      <Button title="Add Invoice" onPress={handleAddInvoice} />

      <FlatList
        data={invoices}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
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
  list: {
    marginTop: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default HomeScreen;
