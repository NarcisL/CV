package isp.lab10.exercise1;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

import javax.swing.*;
import javax.swing.border.Border;
import java.awt.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aircraft implements Runnable {

    private String aircraftId;
    private int altitude = 0;
    private States aircraftState;
    private AtcCommand command = new AtcCommand();
    private long timeInCruisingState;

    public Aircraft(String id) {
        this.aircraftId = id;
    }

    public synchronized void receiveAtcCommand(AtcCommand command) throws InterruptedException {
        this.command = command;
        notify();
    }

    @SneakyThrows
    @Override
    public void run() {
        TakeoffCommand takeoffCommand = new TakeoffCommand(5);
        System.out.println(this.toString());
        if (command.equals(takeoffCommand)) {
            synchronized (this) {
                this.aircraftState = States.TAKING_OFF;
                System.out.println(this.toString());
                wait(10000);
                this.aircraftState = States.TAXING;
                System.out.println(this.toString());
                wait(5000);
                this.aircraftState = States.ASCENDING;
                while (this.altitude < (takeoffCommand.getAltitude() * 1000)) {
                    System.out.println(this.toString());
                    Thread.sleep(10000);
                    this.altitude += 1000;
                }
                this.aircraftState = States.CRUISING;
                timeInCruisingState = System.currentTimeMillis();
                System.out.println(this.toString());
            }
        } else if (this.aircraftState.equals(States.CRUISING)) {
            synchronized (this) {
                timeInCruisingState = System.currentTimeMillis() - timeInCruisingState;
                this.aircraftState = States.DESCENDING;
                while (this.altitude > 0) {
                    System.out.println(this.toString());
                    Thread.sleep(10000);
                    this.altitude -= 1000;
                }
                this.aircraftState = States.LANDED;
                System.out.println(this.toString());
                System.out.println("Time spent in cruising state: " + (timeInCruisingState) / 1000 + "s");
            }


        }
    }

}


