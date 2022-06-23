import { useQuery, useQueryClient } from "react-query";

type SearchResponse = {
	RecordCount: number;
	Records: any[];
};

const searchTopicRequest = async (topic: string): Promise<SearchResponse> => {
	const res = await fetch(
		"https://data.211support.org/api/v2/search?key=79KQMx58rw1hmqX3U6VyYGeIgWtjHB4LDSsnAzOFfJulapZP2ic0TkCEodbNvR",
		{
			method: "Post",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				Dataset: "on",
				Lang: "en",
				SearchType: "proximity",
				Latitude: 48.461312,
				Longitude: -89.228477,
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
	const searchTopic = (topic: string) =>
		useQuery([topic], () => searchTopicRequest(topic), { cacheTime: 100 });

	return { searchTopic };
};

export default useTopic;
