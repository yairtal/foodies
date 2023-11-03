const express = require('express');
const cors = require('cors');
const app=express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get("/items", (req, res) => {
    res.send([{
        title: "Check this out",
        text: "Our new hamburger is ready!",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/500px-Hamburger_%28black_bg%29.jpg",
        link: {
          text: "Order Now!",
          path: "/order"
        }
      },
      {
        title: "Did someone say VEGAN?",
        text: "We also have a vegan Option, just check out our vegan options!",
        image:"https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?w=1110",
        link: {
          text: "I'm Vegan",
          path: "/order"
        }
      }]);
});


app.listen(8081, () => console.log('Server started'));
