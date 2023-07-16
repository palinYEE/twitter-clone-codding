import {
	collection,
	addDoc,
	setDoc,
	doc,
	updateDoc,
	increment,
	deleteDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import store from '../store';

export default async tweet => {
	// eslint-disable-next-line no-async-promise-executor
	try {
		// Already isLiked
		if (tweet.isLiked) {
			//  Delete retweet doc
			const snapshot = await getDocs(
				query(
					collection(db, `likes`),
					where('from_tweet_id', '==', tweet.id),
					where('uid', '==', store.state.user.uid),
				),
			);
			await deleteDoc(snapshot.docs[0].ref);
			//  Decrease retweet number
			await setDoc(
				doc(db, `tweets/${tweet.id}`),
				{
					num_likes: increment(-1),
				},
				{ merge: true },
			);
		} else {
			// Not isLiked
			const data = collection(db, 'likes');
			const inputData = await addDoc(data, {
				from_tweet_id: tweet.id,
				uid: store.state.user.uid,
				created_at: Date.now(),
			});

			await setDoc(
				doc(db, `likes/${inputData.id}`),
				{
					id: inputData.id,
				},
				{ merge: true },
			);

			await updateDoc(doc(db, `tweets/${tweet.id}`), {
				num_likes: increment(1),
			});
		}
	} catch (error) {
		console.log('handle retweet error: ', error);
	}
};
