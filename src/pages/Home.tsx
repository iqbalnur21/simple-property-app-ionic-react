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
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { Property } from "../types";
import { add } from "ionicons/icons";

const Home: React.FC = () => {
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const latestProperties = properties.slice(-10);
    localStorage.setItem("properties", JSON.stringify(latestProperties));
  }, []);
  const properties = JSON.parse(
    localStorage.getItem("properties") || "[]"
  ) as Property[];

  const history = useHistory();

  const handleCardClick = (id: number) => {
    history.push(`/property-detail/${id}`);
  };

  if (!properties) return <div>Loading...</div>;

  return (
    <IonSplitPane contentId="main-content">
      {token && (
        <IonFab className="fab" vertical="center">
          <IonFabButton routerLink="/add-property">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      )}
      <IonPage>
        <IonContent className="home-content">
          <div className="card-container">
            {properties.map((property) => (
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

export default Home;
