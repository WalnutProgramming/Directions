// @ts-check
// https://docs.cypress.io/api/introduction/api.html

// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Where do you need to go?");
    cy.get("#fromRoom")
      .type("3104")
      .should("have.value", "3104");
    cy.get("#toRoom")
      .type("3113")
      .should("have.value", "3113");
    cy.get("button")
      .contains("Go")
      .click();
    cy.url().should("contain", "/directions?fromRoom=3104&toRoom=3113");
    cy.contains("p:nth-child(1)", "Turn left out of room 3104");
    cy.contains(
      "p:nth-child(2)",
      "Continue, then turn right (after passing room 3105 on your right)"
    );
    cy.contains(
      "p:nth-child(3)",
      "Continue, then turn left (after passing room 3111 on your right)"
    );
    cy.contains("p:nth-child(4)", "Continue, then turn right into room 3113");
  });
});
