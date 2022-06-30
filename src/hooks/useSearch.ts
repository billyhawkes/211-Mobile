import { useQuery } from "react-query";
import { UserLocation } from "./useLocation";
import { API_KEY_211 } from "@env";

type SearchResponse = {
	RecordCount: number;
	Records: any[];
};

const searchKeywordRequest = async (
	keyword: string,
	location: UserLocation | undefined
): Promise<SearchResponse> => {
	const res = await fetch(`https://data.211support.org/api/v2/search?key=${API_KEY_211}`, {
		method: "Post",
		headers: { Accept: "application/json", "Content-Type": "application/json" },
		body: JSON.stringify({
			Dataset: "on",
			Lang: "en",
			SearchType: "proximity",
			Latitude: location?.latitude || 48.461312,
			Longitude: location?.longitude || -89.228477,
			Distance: 100,
			Search: "term",
			Term: keyword,
		}),
	});
	const data: SearchResponse = await res.json();
	return data;
};

const searchTopicRequest = async (
	topic: string,
	location: UserLocation | undefined
): Promise<SearchResponse> => {
	const res = await fetch(`https://data.211support.org/api/v2/search?key=${API_KEY_211}`, {
		method: "Post",
		headers: { Accept: "application/json", "Content-Type": "application/json" },
		body: JSON.stringify({
			Dataset: "on",
			Lang: "en",
			SearchType: "proximity",
			Latitude: location?.latitude || 48.461312,
			Longitude: location?.longitude || -89.228477,
			Distance: 100,
			Search: "match",
			MatchMode: "taxterm",
			MatchTerms: topic,
		}),
	});
	const data: SearchResponse = await res.json();
	return data;
};

const useSearch = () => {
	const searchKeyword = (keyword: string, location: UserLocation | undefined) =>
		useQuery(["keyword", keyword], () => searchKeywordRequest(keyword, location), {
			cacheTime: 100,
			enabled: keyword !== "",
		});

	const searchTopic = (topic: string, location: UserLocation | undefined) =>
		useQuery(["topic", topic], () => searchTopicRequest(topic, location), { cacheTime: 100 });

	return { searchKeyword, searchTopic };
};

export default useSearch;
