import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import React from "react";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeSite, setActiveSite] = React.useState("dashboard");
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="App">
      <Header
        authenticated={true}
        handleDrawer={handleDrawer}
        open={drawerOpen}
        setActiveSite={setActiveSite}
      ></Header>
      <Main activeSite={activeSite} drawerOpen={drawerOpen}></Main>
    </div>
  );
}

export default App;
