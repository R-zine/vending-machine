import { useEffect } from "react";
import "./App.css";
import { Controls, Grid, Header, Error } from "./components";
import { useStore } from "./store";
import styled from "@emotion/styled";

const MainWrapper = styled.main`
  display: flex;
  min-width: 100vw;
`;

function App() {
  const updateAppWidth = useStore((state) => state.updateAppWidth);

  useEffect(() => {
    const handleResize = () => {
      updateAppWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [updateAppWidth]);

  return (
    <>
      <Error />
      <Header />
      <MainWrapper>
        <Grid />
        <Controls />
      </MainWrapper>
    </>
  );
}

export default App;
