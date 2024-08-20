import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonSplitPane,
} from "@ionic/react";
import dummyData from "../data/properties.json";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleLogin = () => {
    const user = dummyData.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);

      window.location.href = "/home";
    } else {
      setShowAlert(true);
    }
  };

  return (
    <IonSplitPane>
      <IonPage>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              value={username}
              onIonInput={(e) => setUsername(e.detail.value as string)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value as string)}
            />
          </IonItem>
          <IonButton expand="full" onClick={handleLogin}>
            Login
          </IonButton>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Login Failed"}
            message={"Invalid username or password"}
            buttons={["OK"]}
          />
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Login;
