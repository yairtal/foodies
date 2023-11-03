const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "appfront";
const collectionName = "newsItems";
const usersCollection = "users";

const dummyItems = [
  {
    title: "Check this out",
    text: "Our new hamburger is ready!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/500px-Hamburger_%28black_bg%29.jpg",
    link: {
      text: "Order Now!",
      path: "/order",
    },
  },
  {
    title: "Did someone say VEGAN?",
    text: "We also have a vegan Option, just check out our vegan options!",
    image:
      "https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?w=1110",
    link: {
      text: "I'm Vegan",
      path: "/order",
    },
  },
];

const dummyUsers = [{ phoneNumber: 545331992 }, { phoneNumber: 507866639 }];

async function initDb() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log("Connected to MongoDB");

  const db = client.db(dbName);

  // Check if the newsItems collection exists, if not, create it.
  const collections = await db.collections();
  if (!collections.map((col) => col.s.name).includes(collectionName)) {
    await db.createCollection(collectionName);
    console.log(`Collection ${collectionName} created!`);
  } else {
    console.log(`Collection ${collectionName} already exists!`);
  }

  // Check if the users collection exists, if not, create it.
  if (!collections.map((col) => col.s.name).includes(usersCollection)) {
    await db.createCollection(usersCollection);
    console.log(`Collection ${usersCollection} created!`);
  } else {
    console.log(`Collection ${usersCollection} already exists!`);
  }

  // Insert dummy news items
  const collection = db.collection(collectionName);
  await collection.insertMany(dummyItems);
  console.log("Dummy news items inserted!");

  // Insert dummy users
  const usersCollectionDb = db.collection(usersCollection);
  await usersCollectionDb.insertMany(dummyUsers);
  console.log("Dummy users inserted!");

  client.close();
  console.log("Connection closed.");
}

initDb().catch((err) => console.error(err));
