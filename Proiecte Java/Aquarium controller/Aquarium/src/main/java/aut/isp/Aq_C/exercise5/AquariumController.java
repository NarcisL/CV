package aut.isp.lab4.exercise5;

public class AquariumController {
    FishFeeder fishFeeder = new FishFeeder();
    private String manufacturer;
    private String model;
    private float currentTime;
    private float feedingTime;
    private int temperature;
    private int water;
    Sensor sensor ;
    Acutator actuator;
    LevelSensor sensorWater = new LevelSensor();
    Alarm alarm = new Alarm();
    Heater heather = new Heater();
    TemperatureSensor temperatureSensor = new TemperatureSensor();


    public AquariumController(String manufacturer, String model, float currentTime, float feedingTime, int temperature, int water){
        this.manufacturer = manufacturer;
        this.model = model;
        this. currentTime = currentTime;
        this.feedingTime = feedingTime;
        this.temperature = temperature;
        this.water = water;
    }

    public void setFeedingTime(float feedingTime) {
        this.feedingTime = feedingTime;
    }

    public int getTemperature() {
        return temperature;
    }

    public int getWater() {
        return water;
    }

    public void setCurrentTime(float currentTime) {

        this.currentTime = currentTime;
        if( currentTime == this.feedingTime){
            System.out.println("Timpul pentru masa");
            fishFeeder.feed();
        }
    }

    public void checkTemperature(){
        temperatureSensor.setValue(21);
        if (temperatureSensor.getValue()>=24 && temperatureSensor.getValue()<=27)
            System.out.println("Temperatura este potrivita pentru pestii tropicali");
        else if(getTemperature()<24) {
            System.out.println("Temperatura mult prea mica: " + getTemperature());
            heather.turnOn();
        }
        else{
            System.out.println("Temperatuea mult prea mare: "+ getTemperature());
            heather.turnOn();
        }
    }

    public void checkWater(){
        sensorWater.setValue(13);
        if(sensorWater.getValue()> water){
            alarm.turnOn();
        }
    }

    @Override
    public String toString() {
        return "AquariumController{" +
                "manufacturer='" + manufacturer + '\'' +
                ", model='" + model + '\'' +
                ", currentTime=" + currentTime +
                ", feedingTime=" + feedingTime +
                '}';
    }



}
