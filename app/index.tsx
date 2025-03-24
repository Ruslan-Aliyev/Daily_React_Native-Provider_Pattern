import { SafeAreaView, Text, Button } from "react-native";
import { router } from 'expo-router';
import { useMyDaily } from '@/providers/MyDailyProvider';
import { useState } from 'react';

export default function HomeScreen() {
	const {call}= useMyDaily();
	const [inCall, setInCall] = useState(false)

	return (
		<SafeAreaView>
			<Text>Call</Text>

			<Button
				onPress={() => {
					call.join({ 
						url: 'https://ruslanaliyev.daily.co/ruslanaliyev_room1', 
						startVideoOff: true, 
					})
						.then(() => {setInCall(true)})
						.catch((error) => {console.log({error})});
				}}
				disabled={inCall}
				title="Call"
			/>
			<Button
				onPress={async () => {
					await call.leave();
					setInCall(false);
					// call.destroy(); // This is better done when leaving this page
				}}
				disabled={!inCall}
				title="Hangup"
			/>

			<Button
				onPress={() => {
					call.setLocalAudio(false);
				}}
				title="Mute"
			/>
			<Button
				onPress={() => {
					call.setLocalAudio(true);
				}}
				title="Unmute"
			/>

		</SafeAreaView>
	);
}