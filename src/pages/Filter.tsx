import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonSplitPane,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonLabel,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import "./Filter.css";
import { Property } from "../types";
import { add } from "ionicons/icons";
import { useHistory } from "react-router";

const Filter: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [priceRange, setPriceRange] = useState<number>(5000000);

  useEffect(() => {
    const properties = JSON.parse(
      localStorage.getItem("properties") || "[]"
    ) as Property[];
    const latestProperties = properties.slice(-10);
    setProperties(latestProperties);
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchText) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((property) => property.type === selectedType);
    }

    filtered = filtered.filter((property) => property.price <= priceRange);

    setFilteredProperties(filtered);
  }, [searchText, selectedType, priceRange, properties]);

  const history = useHistory();
  const handleCardClick = (id: number) => {
    history.push(`/property-detail/${id}`);
  };

  return (
    <IonSplitPane contentId="main-content">
      {token && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/add-property">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      )}
      <IonPage>
        <IonContent className="home-content">
          <IonItem>
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value as string)}
              debounce={0}
              placeholder="Search by location"
            />
          </IonItem>
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonSelect
              value={selectedType}
              placeholder="Select Type"
              onIonChange={(e) => setSelectedType(e.detail.value)}
            >
              {[...new Set(properties.map((property) => property.type))].map(
                (type) => (
                  <IonSelectOption value={type} key={type}>
                    {type}
                  </IonSelectOption>
                )
              )}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Price Range</IonLabel>
            <IonRange
              min={0}
              max={5000000}
              step={10000}
              value={priceRange}
              onIonChange={(e) => setPriceRange(e.detail.value as number)}
            />
            <IonLabel slot="end">${priceRange.toLocaleString()}</IonLabel>
          </IonItem>
          <div className="card-container">
            {filteredProperties.map((property) => (
              <IonCard
                key={property.id}
                className="property-card"
                onClick={() => handleCardClick(property.id)}
              >
                <IonImg
                  src={property.photos && property.photos[0]}
                  alt={`Thumbnail for ${property.location}`}
                  className="property-photo"
                />
                <IonCardHeader>
                  <IonCardTitle>{property.location}</IonCardTitle>
                  <IonCardSubtitle>
                    {property.city}, {property.state} - {property.type}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Rooms: {property.rooms}</p>
                  <p>Bathrooms: {property.bathrooms}</p>
                  <p>Price: ${property.price.toLocaleString()}</p>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Filter;
