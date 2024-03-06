package isp.lab10.exercise1;

import java.util.HashSet;
import java.util.Set;

public class ATC {

    public Set<Aircraft> aircrafts = new HashSet<>();

    public synchronized void addAircraft(String id) {
        Aircraft aircraft = new Aircraft(id);
        aircrafts.add(aircraft);
        getAircraftById(id).setAircraftState(States.ON_STAND);
    }

    public synchronized void sendCommand(String aircraftId, AtcCommand cmd) throws InterruptedException {
        Aircraft aircraft = getAircraftById(aircraftId);
        if (aircraft != null) {
            aircraft.receiveAtcCommand(cmd);
        } else {
            System.out.println("Aircraft with ID " + aircraftId + " not found.");
        }
    }

    public Aircraft getAircraftById(String id) {
        for (Aircraft aircraft : aircrafts) {
            if (aircraft.getAircraftId().equals(id)) {
                return aircraft;
            }
        }
        return null;
    }

    public void showAircrafts() {
        for (Aircraft aircraft : aircrafts) {
            System.out.println(aircraft.toString());
        }
    }
}
