import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([{ id: 1, type: 'text', value: '', choices: [] }]);

  const addFormField = () => {
    const newField = {
      id: formFields.length + 1,
      type: 'text',
      value: '',
      choices: [],
    };
    setFormFields([...formFields, newField]);
  };

  const removeFormField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const handleInputChange = (text, id) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, value: text } : field
    );
    setFormFields(updatedFields);
  };

  const handleFieldTypeChange = (type, id) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, type, choices: [] } : field
    );
    setFormFields(updatedFields);
  };

  const addChoice = (id, choice) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, choices: [...field.choices, choice] } : field
    );
    setFormFields(updatedFields);
  };

  const removeChoice = (id, choiceIndex) => {
    const updatedFields = formFields.map((field) =>
      field.id === id
        ? { ...field, choices: field.choices.filter((_, index) => index !== choiceIndex) }
        : field
    );
    setFormFields(updatedFields);
  };

  const renderFieldOptions = (field) => {
    if (field.type === 'text') {
      return null; // No additional options for text fields
    } else if (field.type === 'checkbox' || field.type === 'multipleChoice') {
      return (
        <View>
          <Text style={styles.label}>Options:</Text>
          {field.choices.map((choice, index) => (
            <View key={index} style={styles.choiceContainer}>
              <Text>{`${index + 1}. ${choice}`}</Text>
              <TouchableOpacity onPress={() => removeChoice(field.id, index)}>
                <Text style={styles.removeChoice}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TextInput
            placeholder="Add option"
            style={styles.input}
            value={field.newChoice || ''}
            onChangeText={(text) => setFormFields((prevFields) => prevFields.map((f) => (f.id === field.id ? { ...f, newChoice: text } : f)))}
          />
          <TouchableOpacity onPress={() => addChoice(field.id, field.newChoice)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Option</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const handleSubmit = () => {
    // Handle form submission here, you can access formFields state to get all the values.
    console.log('Form Submitted:', formFields);
    // Add your submission logic here
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {formFields.map((field) => (
          <View key={field.id} style={styles.fieldContainer}>
            <View style={styles.fieldTypeContainer}>
              <Text style={styles.fieldTypeLabel}>Field Type:</Text>
              <Picker
                style={styles.fieldTypePicker}
                selectedValue={field.type}
                onValueChange={(itemValue) => handleFieldTypeChange(itemValue, field.id)}>
                <Picker.Item label="Text" value="text" />
                <Picker.Item label="Checkbox" value="checkbox" />
                <Picker.Item label="Multiple Choice" value="multipleChoice" />
              </Picker>
              <TouchableOpacity onPress={() => removeFormField(field.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={(text) => handleInputChange(text, field.id)}
              placeholder={`Field ${field.id}`}
            />
            {renderFieldOptions(field)}
          </View>
        ))}
        <TouchableOpacity onPress={addFormField} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Field</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Form</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldTypeLabel: {
    marginRight: 10,
  },
  fieldTypePicker: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  removeChoice: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5,
  },
  addButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
  },
};

export default DynamicForm;
