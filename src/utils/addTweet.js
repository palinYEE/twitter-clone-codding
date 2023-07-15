import {
	collection,
	addDoc,
	setDoc,
	doc,
	updateDoc,
	increment,
} from 'firebase/firestore';
import { db } from '../firebase';

export default (tweetBody, currentUser) => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		try {
			const data = collection(db, `tweets`);
			const inputData = await addDoc(data, {
				tweet_body: tweetBody,
				uid: currentUser.uid,
				created_at: Date.now(),
				num_comments: 0,
				num_retweets: 0,
				num_likes: 0,
			});

			await setDoc(
				doc(db, `tweets/${inputData.id}`),
				{
					id: inputData.id,
				},
				{ merge: true },
			);
			await updateDoc(doc(db, `users/${currentUser.uid}`), {
				num_tweets: increment(1),
			});

			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
};
