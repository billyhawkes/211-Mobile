import { useQuery, useQueryClient } from "react-query";
import { UserLocation } from "./useLocation";

type SearchResponse = {
	RecordCount: number;
	Records: any[];
};

const searchTopicRequest = async (
	topic: string,
	location: UserLocation | undefined
): Promise<SearchResponse> => {
	const res = await fetch(
		"https://data.211support.org/api/v2/search?key=79KQMx58rw1hmqX3U6VyYGeIgWtjHB4LDSsnAzOFfJulapZP2ic0TkCEodbNvR",
		{
			method: "Post",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				Dataset: "on",
				Lang: "en",
				SearchType: "proximity",
				Latitude: location?.latitude || 48.461312,
				Longitude: location?.longitude || -89.228477,
				Distance: 10,
				Search: "match",
				MatchMode: "taxterm",
				MatchTerms: topic,
			}),
		}
	);
	const data: SearchResponse = await res.json();
	return data;
};

const useTopic = () => {
	const searchTopic = (topic: string, location: UserLocation | undefined) =>
		useQuery([topic], () => searchTopicRequest(topic, location), { cacheTime: 100 });

	return { searchTopic };
};

export default useTopic;
