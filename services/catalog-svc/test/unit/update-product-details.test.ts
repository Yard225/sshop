// import { FixedIdGenerator, Money, ProductSKU } from '@org/shared-kernel';
// import { UpdateProductUseCase } from '../../core/usecases/update-product.usecase';
// import { InMemoryProductRepository } from '../../adapters/out/in-memory-product.repository';
// import { Variant } from '../../core/entities/variant.entity';
// import { Product } from '../../core/aggregates/product.aggregate';

// describe('Feature: Update product', () => {
//   function createProductVariants(args: any[]): Variant[] {
//     const variants: Variant[] = [];

//     for (const obj of args) {
//       variants.push(Variant.create(obj));
//     }

//     return variants;
//   }

//   const createdProduct = Product.create(
//     {
//       name: 'Camera X',
//       description: '4K action cam',
//       variants: createProductVariants([
//         {
//           sku: ProductSKU.create('SKU-CAM123'),
//           price: Money.cfa(120_000),
//           stock: 10,
//         },
//       ]),
//     },
//     'id-1',
//   );

//   let usecase: UpdateProductUseCase;
//   let repository: InMemoryProductRepository;
//   let idGenerator: FixedIdGenerator;

//   beforeEach(async () => {
//     idGenerator = new FixedIdGenerator();
//     repository = new InMemoryProductRepository([createdProduct]);
//     usecase = new UpdateProductUseCase(repository, idGenerator);
//   });

//   afterEach(async () => {});

//   describe('Scenario: Happy Path', () => {
//     const payload = {
//       id: 'id-1',
//       name: 'Camera X Pro',
//       description: '4K action cam + stabilisation',
//     };

//     it('Should updates name and description then persists', async () => {
//       await usecase.execute(payload);

//       // const updatedProduct = await repository.findById('id-1');
//       // expect(updatedProduct!.props.name).toBe('Camera X Pro');
//       // expect(updatedProduct!.props.description).toBe('4K action cam + stabilisation');
//     });
//   });

//   // describe('Scenario: Product does not exist', () => {
//   //   const payload = {
//   //     id: 'id-2',
//   //     name: 'Camera X Pro',
//   //     description: '4K action cam + stabilisation',
//   //   };

//   //   it('Should fail', async () => {
//   //     expect(async () => await usecase.execute(payload)).rejects.toThrow('Product not found');

//   //     const updatedProduct = await repository.findById('id-2');
//   //     // expect(updatedProduct).toBeNull(null);
//   //   });
//   // });
// });
