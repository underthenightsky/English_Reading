<<<<<<< Updated upstream
import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei/native';
import Sound from 'react-native-sound';
import { useFrame } from '@react-three/fiber/native';
import { setScript } from '../redux_toolkit/scriptSlice';

export default function Avatar(props) {
  const { nodes, materials } = useGLTF(require('../public/avatar/avatar_morph_2.glb'));
  const { animations: idleAnimation } = useFBX(require('../public/avatar/Idle.fbx'));
  const { animations: angryAnimation } = useFBX(require('../public/avatar/Angry.fbx'));
  const { animations: greetAnimation } = useFBX(require('../public/avatar/Standing_Greeting.fbx'));
  const { animations: talking } = useFBX(require('../public/avatar/Talking.fbx'));
=======
import React, {useRef, useState, useEffect} from 'react';
import {useGLTF, useAnimations, useFBX} from '@react-three/drei/native';
import Sound from 'react-native-sound';
import {useFrame} from '@react-three/fiber/native';
import {setScript} from '../redux_toolkit/scriptSlice';
import Voice from '@react-native-community/voice';
import Toast from 'react-native-toast-message';
import {View , Text} from 'react-native';
export default function Avatar(props) {
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [originalMessage, setOriginalMessage] = useState('');
  const [countdown, setCountdown] = useState(10); // Added countdown state
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const text = 'S for Sun';

  const scripts = ['letter_s', 's2','s3',  's4'];
  const lipsyncs = [require('../public/voice_recordings/letter_s.json'),
                    require('../public/voice_recordings/s2.json'),
                    require('../public/voice_recordings/s3.json'),
                    require( '../public/voice_recordings/s4.json')]
  // In the future we can create 3 more arrays for congratulatory and try again scripts and accepted respone
  // and create a useRef hook to cycle between them 
  // also in future would it be possible to get all these arrays from the backend ?
  
  const speechStartHandler = () => {
    console.log('Speech started');
  };

  const speechEndHandler = () => {
    setRecording(false);
    console.log('Speech ended');
  };

  const speechResultsHandler = (e) => {
    console.log('voice event', e);
    const originalMsg = e.value;
    setOriginalMessage(originalMsg);

    // setMessage(trimmedMsg);
    setMessage(originalMsg);
  };

  const speechErrorHandler = (e) => {
    setRecording(false);
    console.log('Speech error', e.error);
  };

  const startRecording = async () => {
    setOriginalMessage('');
    setMessage('');
    setRecording(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  let cacheResources = async =()=>{
    const {nodes, materials} = useGLTF(
      require('../public/avatar/avatar_morph_2.glb'),
    );
    return {nodes, materials};
    

  }
  const {animations: idleAnimation} = useFBX(
    require('../public/avatar/Idle.fbx'),
  );
  const {animations: angryAnimation} = useFBX(
    require('../public/avatar/Angry.fbx'),
  );
  const {animations: greetAnimation} = useFBX(
    require('../public/avatar/Standing_Greeting.fbx'),
  );
  const {animations: talking} = useFBX(require('../public/avatar/Talking.fbx'));
>>>>>>> Stashed changes
  const [animation, setAnimation] = useState('Talking');
  var lipsync = require('../public/voice_recordings/letter_s.json');

 
  const corresponding = {
    A: 'viseme_PP',
    B: 'viseme_kk',
    C: 'viseme_I',
    D: 'viseme_AA',
    E: 'viseme_O',
    F: 'viseme_U',
    G: 'viseme_FF',
    H: 'viseme_TH',
    I: 'viseme_PP',
  };

  idleAnimation[0].name = 'Idle';
  angryAnimation[0].name = 'Angry';
  greetAnimation[0].name = 'Greet';
  talking[0].name = 'Talking';

  useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setAvatarLoaded(true);
    };
  }, []);

  if(!avatarLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const group = useRef();
  const { actions } = useAnimations([idleAnimation[0], angryAnimation[0], greetAnimation[0], talking[0]], group);

  const sound = useRef(null);
  const startTime = useRef(null);
<<<<<<< Updated upstream
  const[script ,setScript] = useState('letter_s');
  
=======
  const [script, setScript] = useState(scripts[0]);
>>>>>>> Stashed changes

  
  useEffect(() => {
    present_script = `${script}.mp3`;
<<<<<<< Updated upstream
    sound.current = new Sound(present_script, Sound.MAIN_BUNDLE, (error) => {
=======
    sound.current = new Sound(present_script, Sound.MAIN_BUNDLE, error => {
>>>>>>> Stashed changes
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
<<<<<<< Updated upstream
      console.log('duration in seconds: ' + sound.current.getDuration() + 'number of channels: ' + sound.current.getNumberOfChannels());

      sound.current.play((success) => {
=======
      console.log(
        'duration in seconds: ' +
          sound.current.getDuration() +
          'number of channels: ' +
          sound.current.getNumberOfChannels(),
      );

      sound.current.play(success => {
>>>>>>> Stashed changes
        if (success) {
          console.log('successfully finished playing');
          setAnimation('Idle');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });

      startTime.current = Date.now();
<<<<<<< Updated upstream
    });
=======
      Voice.onSpeechStart = speechStartHandler;
      Voice.onSpeechEnd = speechEndHandler;
      Voice.onSpeechResults = speechResultsHandler;
      Voice.onSpeechError = speechErrorHandler;

      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev > 1) return prev - 1;
          clearInterval(countdownInterval);
          startRecording();
          console.log('mic on');
          return 0;
        });
      }, 1000);
    });

   
>>>>>>> Stashed changes

    return () => {
      if (sound.current) {
        sound.current.release();
<<<<<<< Updated upstream
      };
      console.log(script);
    //   setScript('fantastic');
=======
      }
      console.log(script);
      //   setScript('fantastic');
>>>>>>> Stashed changes
      console.log(script);
    };
  }, [script]);

<<<<<<< Updated upstream
  var lipsync = require('../public/voice_recordings/letter_s.json');
=======

  useEffect(() => {
    if (message) {
      if (compareText()) {
        Toast.show({
          type: 'success',
          text1: 'The sentence is correct',
          visibilityTime: 2000,
        });
        setScript('fantastic');
        lipsync = require('../public/voice_recordings/fantastic.json');
        setTimeout(sounds, 12000);
        startTime.current = Date.now();
      } else {
        Toast.show({
          type: 'error',
          text1: 'The sentence is incorrect',
          visibilityTime: 2000,
        });
        setScript('try_again');
        lipsync = require('../public/voice_recordings/try_again.json');

        // Restart mic after 7 seconds if input is incorrect
        setTimeout(() => {
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev > 1) return prev - 1;
              clearInterval(countdownInterval);
              startRecording();
              console.log("mic on for incorrect input")
              return 0;
            });
          }, 1000);
        }, 7000);
      }
    }
  }, [message]);

  // Function to compare message with text
  const compareText = () => {
    // Trim and convert text to lowercase to normalize
    const trimmedText = text.replace(/\s+/g, '').toLowerCase();
    console.log('trimmed text', trimmedText);
    console.log('message', message);
    result =-1 ;
    for (let i = 0; i < message.length; i++) {
      message[i] = message[i].replace(/\s+/g, '').toLowerCase();
      if (message[i].localeCompare(trimmedText) ===0 ) {
        result=0;
      }
    }
    return result === 0;
  };
>>>>>>> Stashed changes


  useFrame(() => {
<<<<<<< Updated upstream
    // var lipsync = 
=======
>>>>>>> Stashed changes
    if (!startTime.current) return;
    const elapsedTime = (Date.now() - startTime.current) / 1000;

    // Reset all visemes
    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0;
    });

    // Find the current mouth cue based on elapsed time
<<<<<<< Updated upstream
    const currentCue = lipsync.mouthCues.find((cue) => elapsedTime >= cue.start && elapsedTime <= cue.end);
=======
    const currentCue = lipsync.mouthCues.find(
      cue => elapsedTime >= cue.start && elapsedTime <= cue.end,
    );
>>>>>>> Stashed changes
    if (currentCue) {
      const viseme = corresponding[currentCue.value];
      if (viseme) {
        nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[viseme]] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[viseme]] = 1;
      }
    }
<<<<<<< Updated upstream
   
  },[script]);
=======
  }, [script]);
>>>>>>> Stashed changes

  useEffect(() => {
    actions[animation].reset().play();
    return () => actions[animation].fadeOut();
  }, [animation]);
  

  function sounds(){
    setScript('fantastic')
  }
 
  lipsync= require('../public/voice_recordings/fantastic.json');

<<<<<<< Updated upstream
  setTimeout(sounds,12000);
  startTime.current= Date.now();
//   setScript('fantastic');

return (
=======
  for( let i =0; i< scripts.length;){
  
  if(script == "fantastic" ){
    i++;
    setScript(scripts[i]);
     lipsync = lipsyncs[i];
  };

  }

  return (
>>>>>>> Stashed changes
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      
    </group>
  );
}
