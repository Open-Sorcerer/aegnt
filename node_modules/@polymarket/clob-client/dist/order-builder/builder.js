"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBuilder = void 0;
const tslib_1 = require("tslib");
const order_utils_1 = require("@polymarket/order-utils");
const helpers_1 = require("./helpers");
class OrderBuilder {
    constructor(signer, chainId, signatureType, funderAddress) {
        this.signer = signer;
        this.chainId = chainId;
        this.signatureType = signatureType === undefined ? order_utils_1.SignatureType.EOA : signatureType;
        this.funderAddress = funderAddress;
    }
    /**
     * Generate and sign a order
     */
    buildOrder(userOrder, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, helpers_1.createOrder)(this.signer, this.chainId, this.signatureType, this.funderAddress, userOrder, options);
        });
    }
    /**
     * Generate and sign a market order
     */
    buildMarketOrder(userMarketOrder, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, helpers_1.createMarketBuyOrder)(this.signer, this.chainId, this.signatureType, this.funderAddress, userMarketOrder, options);
        });
    }
}
exports.OrderBuilder = OrderBuilder;
//# sourceMappingURL=builder.js.map