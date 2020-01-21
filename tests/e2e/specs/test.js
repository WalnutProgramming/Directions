// @ts-check
// https://docs.cypress.io/api/introduction/api.html

// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

function beInvalid(/** @type string */ message) {
  return (/** @type JQuery<HTMLElement> */ $inp) => {
    // @ts-ignore
    expect($inp.get(0).checkValidity()).to.equal(false);
    // @ts-ignore
    expect($inp.get(0).validationMessage).to.equal(message);
  };
}

describe("Walnut.Direct Main Functionality", () => {
  it("gets correct directions from room 3104 to 3113", () => {
    cy.visit("/");
    cy.contains("h1", "Where do you need to go?");
    cy.get("#fromRoom")
      .type("3104")
      .should("have.value", "3104");
    // Type an invalid room number
    cy.get("#toRoom")
      .type("3113a")
      .should("have.value", "3113a");
    // It shouldn't allow us to Go, since it's invalid
    cy.get("button")
      .contains("Go")
      .click();
    // It should show us an error message
    cy.get("#toRoom").should(
      beInvalid(`I can't find a room with the name "3113a"`)
    );

    // Shouldn't change the URL
    cy.url().should("not.contain", "/directions");
    // Fix the toRoom
    cy.get("#toRoom")
      .type("{backspace}")
      .should("have.value", "3113");
    // Now it should work
    cy.get("button")
      .contains("Go")
      .click();
    // We're in the directions page
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
    // Back button works
    cy.get("button")
      .should("have.length", 1)
      .click();
    cy.contains("h1", "Where do you need to go?");
  });
});

describe("My Schedule page", () => {
  it("works correctly", () => {
    cy.visit("/");
    cy.get("a[href='/myschedule']").click();
    cy.url().should("contain", "/myschedule/edit?new=true");
    cy.contains(
      "p",
      "You don't seem to have an existing schedule. Create a new one!"
    );
    function shouldHaveNInputs(/** @type {number} */ n) {
      cy.get(".roomInput").should("have.length", n);
      cy.get(".minus-button").should("have.length", n);
      cy.get(".plus-button").should("have.length", 1);
    }
    function nthRoomInput(/** @type {number} */ n) {
      return cy.get(`#scheduleForm .list-item:nth-child(${n}) input`);
    }
    shouldHaveNInputs(7);
    // Change 2nd input
    nthRoomInput(2)
      .should("have.value", "")
      .type("3104")
      .should("have.value", "3104");
    shouldHaveNInputs(7);
    // Change 3rd input
    nthRoomInput(3).type("3113");
    shouldHaveNInputs(7);
    // Add another room to schedule
    cy.get(".plus-button").click();
    shouldHaveNInputs(8);
    // Add more rooms
    nthRoomInput(4).type("2715");
    nthRoomInput(5).type("1309");
    nthRoomInput(4).should("have.value", "2715");
    // Remove the 3rd room
    cy.get("#scheduleForm .list-item:nth-child(4) .minus-button").click();
    shouldHaveNInputs(7);
    nthRoomInput(4).should("have.value", "1309");
    // Save
    cy.get("button.active-button[type='submit']")
      .should("have.length", 2)
      .first()
      .click();
    cy.url()
      .should("contain", "/myschedule")
      .should("not.contain", "/myschedule/edit");
    cy.get("ol button")
      .should("have.length", 2)
      .first()
      .click();
    // Get directions from 2nd to 3rd room in schedule
    cy.url().should(
      "contain",
      "/directions?fromRoom=3104&toRoom=3113&scheduleInd=1"
    );
    cy.contains("Turn left out of room 3104");
    // Go back
    cy.get("button")
      .should("have.length", 1)
      .click();
    cy.url()
      .should("contain", "/myschedule")
      .should("not.contain", "/myschedule/edit");
    // Edit
    cy.get("a[href='/myschedule/edit']").click();
    cy.url()
      .should("contain", "/myschedule/edit")
      .should("not.contain", "/myschedule/edit?new=true");
    // Input invalid room
    nthRoomInput(7).type("notaroom");
    // Saving shouldn't work if there's an invalid room
    cy.get("button.active-button[type='submit']")
      .should("have.length", 2)
      .first()
      .click();
    cy.url().should("contain", "/myschedule/edit");
    nthRoomInput(7).should(
      beInvalid("I can't find a room with the name notaroom")
    );
    // Remove invalid room
    nthRoomInput(7).clear();
    cy.get("button.active-button[type='submit']")
      .should("have.length", 2)
      .first()
      .click();
    cy.url()
      .should("include", "/myschedule")
      .should("not.include", "/myschedule/edit");
  });
});

describe("About Page", () => {
  it("exists", () => {
    cy.visit("/");
    cy.get("a[href='/about']").click();
    cy.contains("Walnut Hills Programming Club");
  });
});

describe("Feedback Page", () => {
  it("exists", () => {
    cy.visit("/");
    cy.get("a[href='/feedback']").click();
    cy.contains("To open this form separately");
  });
});

describe("iOS download suggestion", () => {
  it("doesn't appear normally", () => {
    cy.visit("/");
    cy.contains("h1", "Where do you need to go?");
    cy.get("#iosDownloadSuggestion").should("not.exist");
  });

  it("appears on iPhone", () => {
    // Pretend to be an iPhone
    cy.visit("/", {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, "userAgent", {
          value: "iPhone",
        });
      },
    });
    cy.contains("h1", "Where do you need to go?");
    cy.get("#iosDownloadSuggestion").should("exist");
  });
});
