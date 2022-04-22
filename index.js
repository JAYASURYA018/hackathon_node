const express = require("express");
const app = express();
const PORT = 6000;

app.get("/", (request, response) => {
  response.send("Welcome Guys this is my second hackathon ");
});

const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());

app.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const hashedPassword = await genPassword(password);
  const newUser = {
    username: username,
    password: hashedPassword,
  };
  const result = await createUser(newUser);
  response.send(result);
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const matchedUser = await getUserByName(username);
  if (matchedUser) {
    const isPasswordMatch = await bcrypt.compare(
      password,
      matchedUser.password
    );
    if (isPasswordMatch) {
      const token = jwt.sign({ id: matchedUser._id }, process.env.SECRET_KEY);
      res.send({ messagge: "Logged in sussfully", token: token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(PORT, () => console.log("The server is Started in", PORT));
