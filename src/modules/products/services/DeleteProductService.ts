import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRquest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRquest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
