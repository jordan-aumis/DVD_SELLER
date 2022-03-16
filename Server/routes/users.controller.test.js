const usersRoute = require("./users.controller"); //import file we are testing
const express = require("express"); // import express
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
app.use("/users", usersRoute); //routes

describe("testing-server-routes", () => {

    it("GET", async () => {
      const { body } = await request(app).get("/users"); //uses the request function that calls on express app instance
      expect(body).toContain([
        {
          firstName: "Naruto",
          lastName: "Uzumaki",
        }
      ]);
    });

    it("POST", async () => {
      const { body } = await request(app).post("/users/new").send({
        firstName: "Test",
        userName: "TestNAme",
        lastName: "testLast",
        email: "test@email",
        password: "testPassword",
      }); //uses the request function that calls on express app instance
      expect(body).toBe({ firstName: "Test",
      userName: "TestNAme",
      lastName: "testLast",
      email: "test@email",
      password: "testPassword",})
    });


    it("PATCH", async () => {
      const { body } = await request(app).patch(`/users/${1}/update`).send({
        userName: "UZUUUUMAKI",
      }); //uses the request function that calls on express app instance
      expect(body).toBe({ firstName: "Naruto",
      userName: "UZUUUUMAKI",
    })
    });

  test("DELETE", async () => {
   const { body } = await request(app)
      .delete(`/users/${1}/delete`)
      
    expect(body).toBe({status: 200})
  });
});