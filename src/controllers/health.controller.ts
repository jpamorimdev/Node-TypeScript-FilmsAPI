export default class HealthController {
  public static async getMessage(): Promise<string> {
    return "OK";
  }
}