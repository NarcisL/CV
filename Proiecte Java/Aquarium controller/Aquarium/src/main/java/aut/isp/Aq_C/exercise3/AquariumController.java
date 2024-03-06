package aut.isp.lab4.exercise3;

public class AquariumController {
    private FishFeeder feeder=new FishFeeder();
    private String model,manufacturer;
    private float currentTime,feedingTime;

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

    @Override
    public String toString() {
        return "AquariumController{" +
                "feeder=" + feeder +
                ", model='" + model + '\'' +
                ", manufacturer='" + manufacturer + '\'' +
                ", currentTime=" + currentTime +
                ", feedingTime=" + feedingTime +
                '}';
    }
}
