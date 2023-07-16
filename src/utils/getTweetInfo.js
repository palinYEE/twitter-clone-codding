import {
	getDoc,
	getDocs,
	doc,
	query,
	where,
	collection,
} from 'firebase/firestore';
import { db } from '../firebase';
// import store from '../store';

export default async (tweet, currentUser) => {
	const userData = await getDoc(doc(db, 'users', tweet.uid));

	tweet = {
		...tweet,
		profile_image_url: userData.data().profile_image_url,
		email: userData.data().email,
		username: userData.data().username,
	};

	const retweetCollection = collection(db, `retweets`);
	const retweetSnapshot = await getDocs(
		query(
			retweetCollection,
			where('from_tweet_id', '==', tweet.id),
			where('uid', '==', currentUser.uid),
		),
	);

	if (retweetSnapshot.empty) {
		tweet.isRetweeted = false;
	} else {
		tweet.isRetweeted = true;
	}

	const likeCollection = collection(db, `likes`);
	const likeSnapshot = await getDocs(
		query(
			likeCollection,
			where('from_tweet_id', '==', tweet.id),
			where('uid', '==', currentUser.uid),
		),
	);

	if (likeSnapshot.empty) {
		tweet.isLiked = false;
	} else {
		tweet.isLiked = true;
	}

	return tweet;
};
