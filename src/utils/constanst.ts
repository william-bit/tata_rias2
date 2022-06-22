export class Url {
  private static readonly baseUrl = "http://127.0.0.1:8000/api";
  public static readonly login = this.baseUrl + "/login";
  public static readonly token = this.baseUrl + "/sanctum/csrf-cookie";
  public static readonly register = this.baseUrl + "/register";
  public static readonly listProduct = this.baseUrl + "/list-product";
  public static readonly detailProduct = this.baseUrl + "/detail-product";
}
