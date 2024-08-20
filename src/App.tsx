import React from "react";
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterOutlet,
  IonButton,
  setupIonicReact,
  IonButtons,
  IonMenuButton,
  IonSplitPane,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import Filter from "./pages/Filter";
import Chart from "./pages/Chart";
import Login from "./pages/Login";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import { add } from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => {
  const token = localStorage.getItem("authToken");

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle auto-hide="false">
                <IonItem button routerLink="/home">
                  <IonLabel>Home</IonLabel>
                </IonItem>
                <IonItem button routerLink="/filter">
                  <IonLabel>Filter</IonLabel>
                </IonItem>
                <IonItem button routerLink="/chart">
                  <IonLabel>Chart</IonLabel>
                </IonItem>
                {!token ? (
                  <IonItem button routerLink="/login">
                    <IonLabel style={{ color: "green" }}>Login</IonLabel>
                  </IonItem>
                ) : (
                  <IonItem
                    button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      window.location.reload();
                    }}
                  >
                    <IonLabel style={{ color: "red" }}>Logout</IonLabel>
                  </IonItem>
                )}
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonSplitPane contentId="main-content" style={{ display: "flex" }}>
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start" className="ion-menu-button">
                  <IonMenuButton />
                </IonButtons>
                <div className="ion-menu">
                  <IonTitle>Property App</IonTitle>
                  <div className="horizontal-menu">
                    <IonButtons slot="end">
                      <IonItem button routerLink="/home">
                        <IonLabel>Home</IonLabel>
                      </IonItem>
                      <IonItem button routerLink="/filter">
                        <IonLabel>Filter</IonLabel>
                      </IonItem>
                      <IonItem button routerLink="/chart">
                        <IonLabel>Chart</IonLabel>
                      </IonItem>
                      {!token ? (
                        <IonItem button routerLink="/login">
                          <IonLabel style={{ color: "green" }}>Login</IonLabel>
                        </IonItem>
                      ) : (
                        <IonItem
                          button
                          routerLink="/home"
                          onClick={() => {
                            localStorage.removeItem("authToken");
                            window.location.reload();
                          }}
                        >
                          <IonLabel style={{ color: "red" }}>Logout</IonLabel>
                        </IonItem>
                      )}
                    </IonButtons>
                  </div>
                </div>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonRouterOutlet>
                <Switch>
                  <Route exact path="/home" component={Home} />
                  <Route path="/filter" component={Filter} />
                  <Route path="/chart" component={Chart} />
                  <Route path="/login" component={Login} />
                  <Route path="/add-property" component={AddProperty} />
                  <Route
                    path="/property-detail/:id"
                    component={PropertyDetail}
                  />
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to={"/home"} />}
                  />
                </Switch>
              </IonRouterOutlet>
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
