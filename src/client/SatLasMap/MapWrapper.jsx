import { StateProvider } from "./MapStateContext";
import Map from "./Map";

const SatLasWrapper = props => {
  const { children } = props;

  return (
    <StateProvider>
      <Map>
        {children}
      </Map>
    </StateProvider>
  )
}

export default SatLasWrapper;
