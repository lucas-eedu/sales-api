import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRquest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRquest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productsExists = await productsRepository.findByName(name);

    if (productsExists && name != product.name) {
      throw new AppError('There is already one product with the name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
