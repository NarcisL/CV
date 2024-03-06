package aut.isp.lab4.exercise1;

public class AquariumController {
private String manufacturer,model;
private float currentTime;

    public String getManufacturer() {
        return manufacturer;
    }

    public void setCurrentTime(float currentTime) {
        this.currentTime = currentTime;
    }

    @Override //tostring
    public String toString() {
        return "AquariumController{" +
                "manufacturer='" + manufacturer + '\'' +
                ", model='" + model + '\'' +
                ", currentTime=" + currentTime +
                '}';
    }
}
