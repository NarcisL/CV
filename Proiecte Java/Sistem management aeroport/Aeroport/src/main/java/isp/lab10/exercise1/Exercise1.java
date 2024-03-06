package isp.lab10.exercise1;

public class Exercise1 {

    public static void main(String[] args) throws InterruptedException {
        ATC atc = new ATC();
        TakeoffCommand takeoffCommand = new TakeoffCommand(5);
        LandCommand landCommand = new LandCommand();
        atc.addAircraft("10");
        atc.sendCommand("10", takeoffCommand);
        atc.getAircraftById("10").run();
        Thread.sleep(10000);
        atc.sendCommand("10", landCommand);
        atc.getAircraftById("10").run();


    }
}
