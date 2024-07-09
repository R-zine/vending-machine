import { useStore } from "../store";
import styled from "@emotion/styled";
import { allMoney, acceptedMoney } from "../constants";
import { Button, TextField } from "@mui/material";

type TWrapper = {
  isMobile: boolean;
};

const ControlsWrapper = styled.div<TWrapper>`
  min-width: 450px;
  margin-right: 16px;
  margin-top: ${(props) => (props.isMobile ? "50px" : "76px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: fit-content;
  background-color: white;
  padding: 32px 0;
  position: ${(props) => (props.isMobile ? "fixed" : "inherit")};
  width: ${(props) => (props.isMobile ? "100vw" : "inherit")};
  top: ${(props) => (props.isMobile ? "0px" : "inherit")};
`;

const MoneyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

export const Controls = () => {
  const isMobile = useStore((state) => state.appWidth < 855);
  const isOpen = useStore((state) => state.isMenuOpen);
  const toggleMenu = useStore((state) => state.toggleMenuOpen);
  const balance = useStore((state) => state.balance);
  const addBalance = useStore((state) => state.addBalance);
  const setError = useStore((state) => state.setError);
  const clearBalance = useStore((state) => state.clearBalance);

  if (isMobile && !isOpen) return null;

  return (
    <ControlsWrapper isMobile={isMobile}>
      <TextField
        id="outlined-read-only-input"
        label="Current balance"
        value={balance.toFixed(1)}
        InputProps={{
          readOnly: true,
        }}
      />
      <MoneyGrid>
        {allMoney.map((m) => {
          const isAccepted = acceptedMoney.includes(m as any);

          return (
            <Button
              key={m}
              variant="contained"
              color={isAccepted ? "primary" : "error"}
              onClick={() => {
                if (isAccepted) addBalance(m);
                else setError(`The machine does not accept ${m}!`);
              }}
            >
              {m}
            </Button>
          );
        })}
      </MoneyGrid>

      <Button onClick={() => clearBalance()}>Take Remaining Balance</Button>

      {isMobile && (
        <Button variant="contained" color="error" onClick={() => toggleMenu()}>
          Close
        </Button>
      )}
    </ControlsWrapper>
  );
};
