import { SafeAreaView, Text, Button } from "react-native";
import { router } from 'expo-router';
import { useMyDaily } from '@/providers/MyDailyProvider';

export default function HomeScreen() {
	const {call}= useMyDaily();

	return (
		<SafeAreaView>
			<Text>Call</Text>

			<Button
				onPress={() => {
					call.join({ 
						url: 'https://ruslanaliyev.daily.co/ruslanaliyev_room1', 
						startVideoOff: true, 
					})
						.then(() => {console.log('JOINED')})
						.catch((error) => {console.log({error})});
				}}
				title="Call"
			/>
			<Button
				onPress={async () => {
					await call.leave();
					call.destroy();
				}}
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