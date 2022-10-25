import {Model} from "sequelize";
import {AnyObject} from "../../app";

export class Repository {
  protected getPlain<T extends {} = any>(object: Model<T, T>): T {
    return object.get({
      plain: true,
    });
  }

  protected throwError(message?: string, details?: AnyObject): never {
    throw new Error(`(${message}): ${details}`);
  }
}
