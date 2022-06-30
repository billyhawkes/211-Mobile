import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import useFavourites from "../../hooks/useFavourites";
import { DrawerParamList } from "../../navigation";
import ServiceItem, { ServiceItemSkeleton } from "./ServiceItem";

type Props = {
	services?: any[];
	isLoading: boolean;
	numItems: number;
};

const ServiceList = ({ services, isLoading, numItems }: Props) => {
	const { findFavourites, addFavourite, removeFavourite } = useFavourites();
	const { data: favourites } = findFavourites;
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

	return (
		<>
			{isLoading
				? [...Array(numItems)].map((_, index) => <ServiceItemSkeleton key={index} />)
				: services &&
				  services.map((service) => (
						<ServiceItem
							key={service.id}
							service={service}
							starred={!!favourites.find((o: any) => o.id === service.id)}
							onPress={() => navigation.navigate("Service", { service })}
							onPressStar={(starred) =>
								starred
									? removeFavourite.mutate(service)
									: addFavourite.mutate(service)
							}
						/>
				  ))}
		</>
	);
};

export default ServiceList;
