import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRquest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRquest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
