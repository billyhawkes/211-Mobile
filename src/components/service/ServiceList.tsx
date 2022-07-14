import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import useFavourites from "@/hooks/useFavourites";
import { DrawerParamList } from "@/navigation";
import ServiceItem from "@/components/service/ServiceItem";

type Props = {
	services: Service[];
};

const ServiceList = ({ services }: Props) => {
	const { findFavourites, addFavourite, removeFavourite } = useFavourites();
	const { data: favourites } = findFavourites;
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

	return (
		<>
			{services.map((service) => (
				<ServiceItem
					key={service.id}
					service={service}
					starred={
						favourites &&
						!!favourites.find((favourite: Service) => favourite.id === service.id)
					}
					onPress={() => navigation.navigate("Service", { service })}
					onPressStar={(starred) =>
						starred ? removeFavourite.mutate(service) : addFavourite.mutate(service)
					}
				/>
			))}
		</>
	);
};

export default ServiceList;
