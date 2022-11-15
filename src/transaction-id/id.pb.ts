/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "id";

export interface IDRequest {
  type: string;
}

export interface IDResponse {
  id: number;
  error: string[];
}

export const ID_PACKAGE_NAME = "id";

export interface IDServiceClient {
  getId(request: IDRequest): Observable<IDResponse>;
}

export interface IDServiceController {
  getId(request: IDRequest): Promise<IDResponse> | Observable<IDResponse> | IDResponse;
}

export function IDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("IDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("IDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const I_DSERVICE_NAME = "IDService";
