import { v4 } from 'uuid';

class Helpers {
  static generateKey() {
    return v4();
  }
  static computeTTL() {
    const ttl = new Date();
    ttl.setSeconds(ttl.getSeconds() + Number(process.env.TTL));
    return ttl.toISOString();
  }
}

export default Helpers;
