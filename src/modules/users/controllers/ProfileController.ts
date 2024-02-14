import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const users = await showProfile.execute({ user_id: request.user.id });

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id: request.user.id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
