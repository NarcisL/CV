package aut.isp.lab4.exercise4;

public class FishFeeder {
    private String model,manufacturer;
    private int meals;

    public int getMeals() {
        return meals;
    }

    public void setMeals(int meals) {
        this.meals = meals;
    }

    public void feed(){
        this.meals = getMeals();
        this.meals=this.meals-1;
        System.out.println("Fish feeder has " + getMeals() + " meals left.");
    }
    public int fillUp(){
        setMeals(14);
        System.out.println("Feeder has been refilled");
        return this.meals;
    }
}
