import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonSplitPane,
  IonIcon,
  IonModal,
  IonAlert,
  IonButtons,
} from "@ionic/react";
import { add, trash, pencil } from "ionicons/icons";
import "./PropertyDetail.css";
import { Property } from "../types";

const saveProperties = (properties: Property[]) => {
  localStorage.setItem("properties", JSON.stringify(properties));
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const properties = JSON.parse(
    localStorage.getItem("properties") || "[]"
  ) as Property[];
  const token = localStorage.getItem("authToken");
  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Property | null>(null);
  const [photoToReplace, setPhotoToReplace] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedProperties = JSON.parse(
      localStorage.getItem("properties") || "[]"
    );
    const propertyDetail = storedProperties.find(
      (property: Property) => property.id === parseInt(id, 10)
    );

    setProperty(propertyDetail || null);
    setFormData(propertyDetail || null);
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = reader.result as string;
        if (photoToReplace !== null) {
          setFormData((prevData) => ({
            ...prevData!,
            photos: prevData!.photos!.map((photo, index) =>
              index === photoToReplace ? newPhoto : photo
            ),
          }));
          setPhotoToReplace(null);
        } else {
          setFormData((prevData) => ({
            ...prevData!,
            photos: [...prevData!.photos!, newPhoto],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setFormData((prevData) => ({
      ...prevData!,
      photos: prevData!.photos!.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedProperties = JSON.parse(
      localStorage.getItem("properties") || "[]"
    );
    const updatedProperties = storedProperties.map((property: Property) =>
      property.id === parseInt(id, 10) ? formData : property
    );
    saveProperties(updatedProperties);
    history.push("/home");
  };

  if (!property) return <div>Loading...</div>;

  return (
    <IonSplitPane contentId="main-content">
      <IonPage>
        <IonContent>
          <IonButton routerLink="/home">Back to Home</IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{token ? "Edit" : "Detail"} Property</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <IonGrid>
                        <IonItem>
                          <IonLabel position="stacked">Location</IonLabel>
                          <IonInput
                            disabled={!token}
                            name="location"
                            value={formData?.location || ""}
                            onIonChange={handleInputChange}
                          />
                        </IonItem>
                        <IonRow>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel position="stacked">City</IonLabel>
                              <IonInput
                                disabled={!token}
                                name="city"
                                value={formData?.city || ""}
                                onIonChange={handleInputChange}
                              />
                            </IonItem>
                          </IonCol>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel position="stacked">State</IonLabel>
                              <IonInput
                                disabled={!token}
                                name="state"
                                value={formData?.state || ""}
                                onIonChange={handleInputChange}
                              />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel position="stacked">Rooms</IonLabel>
                              <IonInput
                                disabled={!token}
                                name="rooms"
                                type="number"
                                value={formData?.rooms || ""}
                                onIonChange={handleInputChange}
                              />
                            </IonItem>
                          </IonCol>
                          <IonCol size="6">
                            <IonItem>
                              <IonLabel position="stacked">Bathrooms</IonLabel>
                              <IonInput
                                disabled={!token}
                                name="bathrooms"
                                type="number"
                                value={formData?.bathrooms || ""}
                                onIonChange={handleInputChange}
                              />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                        <IonItem>
                          <IonLabel position="stacked">Type</IonLabel>
                          {token ? (
                            <IonSelect
                              name="type"
                              value={formData?.type || ""}
                              onIonChange={handleInputChange}
                            >
                              {[
                                ...new Set(
                                  properties.map((property) => property.type)
                                ),
                              ].map((type) => (
                                <IonSelectOption value={type} key={type}>
                                  {type}
                                </IonSelectOption>
                              ))}
                            </IonSelect>
                          ) : (
                            <IonInput
                              disabled={!token}
                              name="state"
                              value={formData?.type || ""}
                              onIonChange={handleInputChange}
                            />
                          )}
                        </IonItem>
                        <IonItem>
                          <IonLabel position="stacked">Asking Price</IonLabel>
                          <IonInput
                            disabled={!token}
                            name="price"
                            type="number"
                            value={formData?.price || ""}
                            onIonChange={handleInputChange}
                          />
                        </IonItem>
                        {token ? (
                          <IonItem>
                            <IonLabel position="stacked">Photos</IonLabel>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              className="photo-upload-input"
                              ref={fileInputRef}
                            />
                          </IonItem>
                        ) : null}
                        <IonRow>
                          <IonGrid className="photo-gallery">
                            <IonRow className="photo-gallery-row">
                              {formData?.photos?.map((photo, index) => (
                                <IonCol
                                  size="6"
                                  key={index}
                                  className="photo-col"
                                >
                                  <IonImg
                                    src={photo}
                                    alt={`Property photo ${index + 1}`}
                                    className="property-photo"
                                    style={{ marginBottom: !token ? 100 : 0 }}
                                  />
                                  {token && (
                                    <>
                                      <IonButton
                                        color="danger"
                                        onClick={() => handleDeletePhoto(index)}
                                        className="photo-action-button-delete"
                                      >
                                        <IonIcon icon={trash} />
                                      </IonButton>
                                      <IonButton
                                        color="warning"
                                        onClick={() => {
                                          setPhotoToReplace(index);
                                          fileInputRef.current?.click();
                                        }}
                                        className="photo-action-button-edit"
                                      >
                                        <IonIcon icon={pencil} />
                                      </IonButton>
                                    </>
                                  )}
                                </IonCol>
                              ))}
                            </IonRow>
                          </IonGrid>
                        </IonRow>
                      </IonGrid>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                {token && (
                  <IonButton
                    type="submit"
                    expand="full"
                    style={{ marginBottom: 100 }}
                  >
                    Save
                  </IonButton>
                )}
              </form>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message="An error occurred while saving the property data."
          buttons={["OK"]}
        />
      </IonPage>
    </IonSplitPane>
  );
};

export default PropertyDetail;
