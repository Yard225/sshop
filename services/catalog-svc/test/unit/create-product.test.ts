describe("Feature: Create product", () => {
  let usecase: CreateProductUseCase;
  let repository: InMemoryProductRepository;

  beforeEach(async () => {
    repository = new InMemoryProductRepository();
    usecase = new CreateProductUseCase(repository, fixedIDGenerator);
  });
  afterEach(async () => {});

  describe("Scenario: Happy Path", () => {
    const payload = {};
    it("Should create a new product with two variants and returns its id", async () => {});
  });
});
