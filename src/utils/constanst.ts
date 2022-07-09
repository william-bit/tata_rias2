export class Url {
  private static readonly baseUrl = "http://127.0.0.1:8000/api";
  public static readonly login = this.baseUrl + "/login";
  public static readonly user = this.baseUrl + "/user-api";
  public static readonly token = "http://127.0.0.1:8000/sanctum/csrf-cookie";
  public static readonly register = this.baseUrl + "/register";
  public static readonly listProduct = this.baseUrl + "/product";
  public static readonly shop = this.baseUrl + "/shop";
  public static readonly home = this.baseUrl + "/home";
  public static readonly transaction = this.baseUrl + "/transaction/get";
  public static readonly transactionVendor =
    this.baseUrl + "/transaction/get-vendor";
  public static readonly storeProduct = this.baseUrl + "/product";
  public static readonly storeCheckout = this.baseUrl + "/checkout";
  public static readonly detailProduct =
    this.baseUrl + "/product/detail-product";
  public static readonly storeProfilePicVendor =
    this.baseUrl + "/vendor/picture";
}
