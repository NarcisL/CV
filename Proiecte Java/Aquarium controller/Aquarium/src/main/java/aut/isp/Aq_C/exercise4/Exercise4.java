package aut.isp.lab4.exercise4;

public class Exercise4 {
    public static void main(String[] args) {
        AquariumController c1= new AquariumController();
        c1.setCurrentTime(14);
        c1.setFeedingTime(14);
        c1.setLightTimePD(7);
        System.out.println(c1.toString());
    }
}
