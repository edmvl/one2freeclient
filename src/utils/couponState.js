const getCouponState = (coupon = {}) => {
    if (new Date(coupon.validUntil) < new Date()) {
        return "expired"
    }
    if (coupon.discountCount >= coupon.discountThreshold) {
        return "enough"
    }
    if (coupon.discountCount <= coupon.discountThreshold) {
        return "insufficiently"
    }
};
export default getCouponState;
