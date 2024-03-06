package aut.isp.lab4.exercise4;

import aut.isp.lab4.exercise3.FishFeeder;

public class AquariumController {
    private FishFeeder feeder=new FishFeeder();
    private String model,manufacturer;
    private float currentTime,feedingTime;
    private float lightTimePD=0;
    private boolean lightON=(false);

    public float getLightTimePD() {
        return lightTimePD;
    }

    public void setLightTimePD(float lightTimePD) {
        this.lightTimePD = lightTimePD;
    }

    public float getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(float currentTime) {
        this.currentTime = currentTime;
        if(this.currentTime==getFeedingTime())
            feeder.feed();
    }

    public float getFeedingTime() {
        return feedingTime;
    }

    public void setFeedingTime(float feedingTime) {
        this.feedingTime = feedingTime;
    }
    public void activateSwitch(){
        if (this.lightTimePD<=6)
            lightON=(true);
            this.lightTimePD++;
        if (this.lightTimePD>=8)
            lightON=(false);
    }

    @Override
    public String toString() {
        return "AquariumController{" +
                "feeder=" + feeder +
                ", model='" + model + '\'' +
                ", manufacturer='" + manufacturer + '\'' +
                ", currentTime=" + currentTime +
                ", feedingTime=" + feedingTime +
                ", lightTimePD=" + lightTimePD +
                ", lightON=" + lightON +
                '}';
    }
}
