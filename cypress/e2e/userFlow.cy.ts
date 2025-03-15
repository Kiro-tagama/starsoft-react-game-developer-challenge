describe("Game Page without user", () => {
  beforeEach(() => {
    cy.visit("/game");
  });

  it("should return 404 when accessing /game without login", () => {
    cy.visit("/game", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
  });
});

describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login and edit account balance", () => {
    // Fill login form
    cy.get('input[type="text"]').type("testuser");
    cy.get('input[type="password"]').type("password123");
    cy.get("button").contains("Logar").click();

    // Check if login was successful
    cy.contains("Bem-vindo, testuser").should("be.visible");

    // Update balance
    cy.get('input[type="number"]').clear().type("100");
    cy.get("button").contains("Atualizar e jogar").click();

    // Assert redirection to the game page
    cy.url().should("include", "/game");
  });
});

describe("Game Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[type="text"]').type("testuser");
    cy.get('input[type="password"]').type("password123");
    cy.get("button").contains("Logar").click();
    cy.get('input[type="number"]').clear().type("100");
    cy.get("button").contains("Atualizar e jogar").click();
  });

  it("should open and close the menu modal", () => {
    cy.get('img[alt="menu"]').click();
    cy.contains("Info.").should("be.visible");

    cy.contains("nome: testuser").should("be.visible");
    cy.contains("regras:").should("be.visible");

    cy.contains("Close").click();
    cy.contains("Modal Title").should("not.exist");
  });

  it("should toggle turbo and auto spin", () => {
    cy.get('img[alt="turbo"]').click();
    cy.get('img[alt="turbo"] + div').should("have.class", "bg-emerald-50");

    cy.get('img[alt="auto"]').click();
    cy.get('img[alt="auto"] + div').should("have.class", "bg-emerald-50");

    cy.wait(5000);
    cy.get('img[alt="auto"]').click();
  });
});
