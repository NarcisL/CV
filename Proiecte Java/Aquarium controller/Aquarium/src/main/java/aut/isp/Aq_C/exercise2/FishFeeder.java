package aut.isp.lab4.exercise2;

public class FishFeeder {
    private String manufacturer,model;
    private int meals;

    public int getMeals() {
        return meals;
    }

    public void setMeals(int meals) {
        this.meals = meals;
    }
    private void feed(){
        this.meals = getMeals();
        this.meals=this.meals-1;
        System.out.println("Fish feeder has " + getMeals() + " meals left.");
    }
    private int fillUp(){
        setMeals(14);
        return this.meals;
    }
}
