import {Model} from "sequelize";
import {AnyObject} from "../../app";

export class Repository<M extends {} = any> {
  protected getPlain(object: Model<M, M>): M {
    return object.get({
      plain: true,
    });
  }

  protected throwError(message?: string, details?: AnyObject): never {
    throw new Error(`(${message}): ${details}`);
  }
}
