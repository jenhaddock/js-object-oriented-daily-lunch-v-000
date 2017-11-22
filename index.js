let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;
let store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employerId){
    this.id = ++customerId;
    this.name = name;
    this.employerId = employerId;

    store.customers.push(this);
  }
  meals(){
    return store.meals.filter(function(mealMatch){
      return mealMatch.customerId === this.id
    }.bind(this))
  }
  deliveries(){
    return store.deliveries.filter(function(deliveryMatch){
      return deliveryMatch.customerId === this.id
    }.bind(this))
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(function(deliveryMatch){
      return deliveryMatch.mealId === this.id
    }.bind(this))
  }
  customers(){
    return this.deliveries().map(function(deliveryMatch){
      return deliveryMatch.customer()
    })
  }
}

class Delivery {
  constructor(mealId, customerId){
    this.id = ++deliveryId;
    if(mealId){
      this.mealId = mealId;
    }
    if(customerId){
      this.customerId = customerId;
    }

    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this))
  }
  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    }.bind(this))
  }
}

class Employer {
  constructor(name){
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }
}
