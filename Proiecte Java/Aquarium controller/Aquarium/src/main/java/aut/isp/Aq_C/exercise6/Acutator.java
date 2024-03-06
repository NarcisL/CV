package aut.isp.lab4.exercise6;

abstract class Acutator {
    private String manufacturer,model;
    public void turnOn(){}
    public void turnOff(){}

    @Override
    public String toString() {
        return "Acutator{" +
                "manufacturer='" + manufacturer + '\'' +
                ", model='" + model + '\'' +
                '}';
    }
}