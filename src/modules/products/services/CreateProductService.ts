import { getCustomRepository } from "typeorm";
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productsExists = await productsRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one product with the name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
