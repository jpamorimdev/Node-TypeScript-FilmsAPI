export default class HealthController {
  public static async getStatus(): Promise<number> {
    return 200;
  }
}