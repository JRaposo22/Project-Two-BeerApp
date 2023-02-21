const app = require("./app");
const { MongoClient, ObjectID } = require("mongodb");

const { request } = require("express");
const client = new MongoClient(process.env.MONGODB_URI);




var collection;

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;


//MongoDB Atlas autocomplete
app.get("/wines/search", async (request, response) => {
  try {
      let result = await collection.aggregate([
          {
              "$search": {
                  "autocomplete": {
                      "query": `${request.query.term}`,
                      "path": "wine",
                      "fuzzy": {
                          "maxEdits": 2,
                          "prefixLength": 3
                      }
                  }
              }
          }
      ]).toArray();
      response.send(result);
  } catch (e) {
      response.status(500).send({ message: e.message });
  }
});

app.get("/get/:id", async (request, response) => {
  try {
      let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
      response.send(result);
  } catch (e) {
      response.status(500).send({ message: e.message });
  }
});


app.listen(PORT, async () => {

  try {
    console.log(`Server listening on http://localhost:${PORT}`);
    await client.connect();
    collection = client.db("test").collection("wines");
} catch (e) {
    console.error(e);
}
  
});













