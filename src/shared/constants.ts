export default class Constants {
  static get aws_region() {
    return process.env.AWS_REGION || 'us-east-1';
  }

  static get pairsTable() {
    return (
      process.env.PAIRS_TABLE_NAME || 'exchage-rate-calculator-pair-table-dev'
    );
  }

  static get usersTable() {
    return (
      process.env.USERS_TABLE_NAME || 'exchage-rate-calculator-user-table-dev'
    );
  }
}
