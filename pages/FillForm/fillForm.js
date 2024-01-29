import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {CheckBox} from '@react-native-community/checkbox';

const FormFromJSON = () => {
  const formData = [
    {"choices": [], "id": 1, "type": "text", "value": "text"},
    {"choices": ["a", "b", "c"], "id": 2, "newChoice": "", "type": "multipleChoice", "value": "MC"},
    {"choices": ["op1", "op2", "op3"], "id": 3, "newChoice": "", "type": "checkbox", "value": "CB"}
  ];

  const [formResponses, setFormResponses] = useState({});

  const handleTextChange = (question, value) => {
    setFormResponses({ ...formResponses, [question]: value });
  };

  const handleChoiceChange = (question, choice) => {
    const selectedChoices = formResponses[question] || [];
    const updatedChoices = selectedChoices.includes(choice)
      ? selectedChoices.filter((c) => c !== choice)
      : [...selectedChoices, choice];

    setFormResponses({ ...formResponses, [question]: updatedChoices });
  };

  const renderForm = () => {
    return formData.map((i) => {
      if (i.type=="text") {
        // case "text":
          return (
            <View key={i.id} style={{ marginBottom: 20 }}>
              <Text>{i.value}</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                onChangeText={(text) => handleTextChange(i.value, text)}
                placeholder={`Enter ${i.value}`}
              />
            </View>
          ); 
      }
      if (i.type=="multipleChoice") {
        // case "multipleChoice":
          return (
            <View key={i.id} style={{ marginBottom: 20 }}>
              <Text>{i.value}</Text>
              {i.choices.map((choice, index) => (
                <TouchableOpacity key={index} onPress={() => handleChoiceChange(i.value, choice)}>
                  <Text>{choice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
              }
    if (i.type=="checkbox") {
        // case "checkbox":
          return (
            <View key={i.id} style={{ marginBottom: 20 }}>
              <Text>{i.value}</Text>
              {i.choices.map((choice, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <CheckBox
                    value={formResponses[i.value]?.includes(choice)}
                    onValueChange={() => handleChoiceChange(i.value, choice)}
                  />
                  <Text>{choice}</Text>
                </View>
              ))}
            </View>
          );
              }
        // default:
          return null;
            }
        )}

  return (
    <View>
    <ScrollView style={{ padding: 20 }}>
      {renderForm()}
      <TouchableOpacity onPress={() => console.log('Form Responses:', formResponses)} style={{ marginTop: 20, padding: 10, backgroundColor: 'green', alignItems: 'center', borderRadius: 5 }}>
        <Text style={{ fontSize: 16, color: 'white' }}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default FormFromJSON;
