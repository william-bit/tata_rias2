export class Url {
  private static readonly baseUrl = "http://127.0.0.1:8000/api";
  public static readonly login = this.baseUrl + "/login";
  public static readonly user = this.baseUrl + "/user-api";
  public static readonly token = "http://127.0.0.1:8000/sanctum/csrf-cookie";
  public static readonly register = this.baseUrl + "/register";
  public static readonly listProduct = this.baseUrl + "/product";
  public static readonly picture = this.baseUrl + "/user/picture";
  public static readonly listRequest = this.baseUrl + "/request";
  public static readonly listProductVendor = this.baseUrl + "/product-vendor";
  public static readonly shop = this.baseUrl + "/shop";
  public static readonly invoice = this.baseUrl + "/order/detail";
  public static readonly listVendor = this.baseUrl + "/vendor";
  public static readonly home = this.baseUrl + "/home";
  public static readonly detailVendor = this.baseUrl + "/vendor/detail";
  public static readonly transaction = this.baseUrl + "/transaction/get";
  public static readonly transactionVendor =
    this.baseUrl + "/transaction/get-vendor";
  public static readonly requestVendor =
    this.baseUrl + "/transaction/get-request";
  public static readonly storeProduct = this.baseUrl + "/product";
  public static readonly storeCheckout = this.baseUrl + "/checkout";
  public static readonly storeRequest = this.baseUrl + "/vendor/request";
  public static readonly approvalRequest =
    this.baseUrl + "/vendor/request/approval";
  public static readonly approvalOrder = this.baseUrl + "/transaction/approval";
  public static readonly storeProfilePic = this.baseUrl + "/user/picture";
  public static readonly storeProfilePicCustomer =
    this.baseUrl + "/customer/picture";
  public static readonly detailProduct =
    this.baseUrl + "/product/detail-product";
  public static readonly profile = this.baseUrl + "/profile";
}
