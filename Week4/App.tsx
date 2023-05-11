import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import {
  NativeBaseProvider, Slider, Box, Checkbox, VStack
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

interface blocks {
  th: string;
  priority: string;
  check : boolean;
}

export default function App() {
  const [block, setBlock] = useState<blocks>({
    th: "",
    priority: "!!",
    check: false 
  });
  const [arrayValue, setArrayValue] = useState<string>([]);
  const [sliderValue, setSliderValue] = useState<number>(10);

  const handleValueChange = (value) => {
    setSliderValue(value); // 更新狀態
    if(value == 0) setBlock({ ...block, priority: "!!!" });
    else if(value == 10) setBlock({ ...block, priority: "!!" });
    else setBlock({ ...block, priority: "!" });
  };

  const handlePress = () => {
    if (block.th.trim() === '') {
      Alert.alert('錯誤', '你沒事做啊!');
      return;
    }
    else{
      setArrayValue({...arrayValue, [block.th]: block.priority}); // 將輸入值添加到數組中
      setBlock({ ...block, th: "" });
    }
  };

  function handleThChange(text: string) {
    setBlock({ ...block, th: text });
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{alignSelf:'center',alignItems:'center'}}>
        <Text style={styles.title}>TO DO LIST</Text>
      </SafeAreaView>

      <TextInput
        style={styles.input}
        placeholder="輸入代辦事項"
        onChangeText={handleThChange}
        value={block.th}
      />

      <Box alignItems="center" w="100%">
        <Slider size="md" 
          w="3/4" 
          maxW="300" 
          defaultValue={10} 
          minValue={0} 
          maxValue={20} 
          step={10}
          value={sliderValue}
          onChangeEnd ={handleValueChange}
          
          >

          <Slider.Track shadow={2}>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb shadow={3} />
        </Slider>
      </Box>

      <SafeAreaView style={{alignSelf:'center',alignItems:'center'}}>
        <Text style={styles.word}>!!!                      !!                        !</Text>
      </SafeAreaView>

    <Box style={styles.button}>
      <TouchableOpacity onPress = {handlePress} >
        <Text style={styles.buttonText}>加入</Text>
      </TouchableOpacity>
    </Box>

    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />

    {Object.keys(arrayValue).map((key) => (
      <Box style = {styles.list}>
        <VStack space={3}>
        <Checkbox value="test">
          <Text style = {styles.list_word} key={key}>
            {key}:                           {arrayValue[key]}
          </Text>
          </Checkbox>
        </VStack>
      </Box>
    ))}

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize:30,
    color:"#000000",
    marginBottom: 20,
  },
  word: {
    fontWeight: "bold",
    fontSize:18,
    color:"#000000",
    marginBottom: 0,
    marginTop: -40,
  },
  input :{
    alignSelf:'center',
    alignItems:'center',
    width:200,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    alignSelf:'center',
    alignItems:'center',
    width: 200,
    height: 50,
    backgroundColor: '#009688',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    alignSelf:'center',
    alignItems:'center',
    marginTop: 10,
  },
  list_word: {
    alignSelf:'center',
    alignItems:'center',
    fontSize:20,
  },
});
