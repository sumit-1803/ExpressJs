import { useMemo, useState } from 'react';
import './App.css';

function App() {
const words = ["mouse", "monitor" , "keyboard", "laptop", "headphones", "charger", "printer", "webcam", "microphone", "speaker", "router", "modem", "ethernet", "cable", "adapter", "dongle", "hub", "switch", "firewall", "server", "desktop", "laptop", "tablet", "smartphone", "smartwatch", "smartglasses", "smartclothes", "smartshoes", "smartband", "smartjacket", "smartsocks", "smartgloves", "smartcap", "smartbelt", "smartnecklace", "smartearrings", "smartbracelet", "smartring", "smartwallet", "smartbag", "smartumbrella", "smartpen", "smartbook", "smartdesk", "smartchair", "smartbed", "smartmirror", "smartfridge", "smartoven", "smartdishwasher", "smartwashingmachine", "smartdryer", "smartvacuumcleaner", "smartairconditioner", "smartheater", "smartlightbulb", "smartdoorlock", "smartspeaker", "smartthermostat", "smartsecuritycamera", "smartdoorbell", "smartalarm", "smartdetector", "smartlock", "smartswitch", "smartplug", "smartremote", "smartcontroller", "smarttracker", "smartwatch", "smartband", "smartglasses", "smartclothes", "smartshoes", "smartjacket", "smartsocks", "smartgloves", "smartcap", "smartbelt", "smartnecklace", "smartearrings", "smartbracelet", "smartring", "smartwallet", "smartbag", "smartumbrella", "smartpen", "smartbook", "smartdesk", "smartchair", "smartbed", "smartmirror", "smartfridge", "smartoven", "smartdishwasher", "smartwashingmachine", "smartdryer", "smartvacuumcleaner", "smartairconditioner", "smartheater", "smartlightbulb", "smartdoorlock", "smartspeaker", "smartthermostat", "smartsecuritycamera", "smartdoorbell", "smartalarm", "smartdetector", "smartlock", "smartswitch", "smartplug", "smartremote", "smartcontroller", "smarttracker"]  
  const [inputValue, setInputValue] = useState("");
  
  // Generate random sentences out of the words and store them in state
  const [sentences] = useState(() => {
    const sentencesArray = [];
    for (let i = 0; i < 1000; i++) {
      const sentence = [];
      for (let j = 0; j < 5; j++) {
        sentence.push(words[Math.floor(Math.random() * words.length)]);
      }
      sentencesArray.push(sentence.join(' '));
    }
    return sentencesArray;
  });

  // Filter sentences based on input value
  const filteredSentences = useMemo(() => {
    return sentences.filter(sentence => 
      sentence.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, sentences]);

  return (
    <>
      <div className='p-4 m-4 rounded-lg bg-gray-800 text-white flex justify-center items-center'>
        Filtered Rendering of List
      </div>
      <div className='flex justify-center'>
        <input 
          className='border-gray-800 border-2 p-2 m-2' 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className='bg-green-500 rounded-xl m-2 p-2 pl-6 pr-6'>Search</button>
      </div>
      <div>
        <ul className='list-disc'>
          {filteredSentences.map((sentence, index) => (
            <li key={index} className='p-2 m-2 bg-gray-200 rounded-lg'>
              {sentence}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
