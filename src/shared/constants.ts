export default class Constants {
  static get ws_url() {
    return (
      process.env.WS_URL ||
      'https://9oljgubvp1.execute-api.us-east-1.amazonaws.com/sandbox/'
    );
  }

  static get aws_region() {
    return process.env.AWS_REGION || 'us-east-1';
  }

  static get websocketConnectionsTable() {
    return (
      process.env.WEBSOCKET_CONNECTIONS_TABLE_NAME ||
      'notification-websocket-connection-table-sandbox'
    );
  }

  static get webpushConnectionsTable() {
    return (
      process.env.WEBPUSH_CONNECTIONS_TABLE_NAME ||
      'notification-webpush-connection-table-sandbox'
    );
  }

  static get notificationsTable() {
    return process.env.NOTIFICATIONS_TABLE_NAME || 'notification-table-sandbox';
  }

  static get usersTable() {
    return process.env.USERS_TABLE_NAME || 'notification-user-table-sandbox';
  }

  static get userGroupTable() {
    return process.env.USERS_GROUP_TABLE_NAME || 'notification-user-group-table-sandbox';
  }

  static get defaultPageSize() {
    return 10;
  }

  static get defaultTimeInMonthsInDB() {
    return 3;
  }

  static get defaultTimeInSecondsInView() {
    return 5;
  }

  static get defaultStringValue() {
    return '';
  }
}
