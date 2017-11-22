let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;
let store = {customers: [], meals: [], deliveries: [], employers: []};

class Customer {
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if (employer){
      this.employerId = employer.id
    }

    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(function(deliveryMatch){
      return deliveryMatch.customerId === this.id
    }.bind(this))
  }
  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    })
  }
  totalSpent(){
    return this.meals().reduce(function(a, b){
      return a.price + b.price;
    })
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
  static byPrice(){
//    return array.slice().sort(a, b) => {
  //    return a.price - b.price;
  //  }
  }
}

class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId;
    if(meal){
      this.mealId = meal.id;
    }
    if(customer){
      this.customerId = customer.id;
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
