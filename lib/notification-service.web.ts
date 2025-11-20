// lib/notification-service.web.ts
// This is a no-op (no operation) implementation for web builds.

export class NotificationServiceWeb {


  public async initialize(): Promise<void> {
    console.log("NotificationService: Web environment, not initializing.");
  }

  public async sendLocalNotification(
    _title: string,
    _body: string,
    _id?: number,
  ): Promise<void> {
    console.log("NotificationService: Web environment, local notifications not available.");
  }

  public async registerDeviceToken(_userId: string): Promise<void> {
    console.log("NotificationService: Web environment, device token registration not available.");
  }

  public async unregisterDevice(): Promise<void> {
    console.log("NotificationService: Web environment, device unregistration not available.");
  }

  // Private methods don't need to be implemented for web if they are not called
  // from public methods that are also implemented for web.
  private setupPushListeners(_PushNotifications: any): void {
    console.log("NotificationService: Web environment, push listeners not set up.");
  }

  private async sendTokenToServer(_userId: string, _token: any): Promise<void> {
    console.log("NotificationService: Web environment, send token to server not applicable.");
  }
}
