export default {
  /**
   * List membership packages
   *
   * @returns
   * @memberof MP
   */
  listMemberships() {
    return this.$fetch('GET', '/membership', { auth: 'basic' });
  },

  /**
   * Get a membership package by id
   * @param {string} id
   * @returns
   * @memberof MP
   */
  getMembershipById(id) {
    return this.$fetch('GET', `/membership/${id}`, { auth: 'basic' });
  },

  /**
   *
   * @param {*} body
   */
  addSubscription(body) {
    return this.$fetch('POST', '/subscription', {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },

  /**
   *
   * @param {*} body
   */
  getCoupon({ membership, coupon }) {
    const path = `/coupons/${coupon}?membership=${membership}`;
    return this.$fetch('GET', path, { auth: 'basic' });
  },
};
