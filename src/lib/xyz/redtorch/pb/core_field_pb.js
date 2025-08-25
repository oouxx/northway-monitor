export function encodeGatewayField(message) {
  let bb = popByteBuffer();
  _encodeGatewayField(message, bb);
  return toUint8Array(bb);
}

function _encodeGatewayField(message, bb) {
  // optional string gatewayId = 1;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gatewayId);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string description = 3;
  let $description = message.description;
  if ($description !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $description);
  }

  // optional GatewayTypeEnum gatewayType = 4;
  let $gatewayType = message.gatewayType;
  if ($gatewayType !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeGatewayTypeEnum($gatewayType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GatewayAdapterTypeEnum gatewayAdapterType = 5;
  let $gatewayAdapterType = message.gatewayAdapterType;
  if ($gatewayAdapterType !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeGatewayAdapterTypeEnum($gatewayAdapterType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ConnectStatusEnum status = 6;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeConnectStatusEnum($status, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool authErrorFlag = 7;
  let $authErrorFlag = message.authErrorFlag;
  if ($authErrorFlag !== undefined) {
    writeVarint32(bb, 56);
    writeByte(bb, $authErrorFlag ? 1 : 0);
  }
}

export function decodeGatewayField(binary) {
  return _decodeGatewayField(wrapByteBuffer(binary));
}

function _decodeGatewayField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gatewayId = 1;
      case 1: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string description = 3;
      case 3: {
        message.description = readString(bb, readVarint32(bb));
        break;
      }

      // optional GatewayTypeEnum gatewayType = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gatewayType = _decodeGatewayTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional GatewayAdapterTypeEnum gatewayAdapterType = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gatewayAdapterType = _decodeGatewayAdapterTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional ConnectStatusEnum status = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.status = _decodeConnectStatusEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional bool authErrorFlag = 7;
      case 7: {
        message.authErrorFlag = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeContractField(message) {
  let bb = popByteBuffer();
  _encodeContractField(message, bb);
  return toUint8Array(bb);
}

function _encodeContractField(message, bb) {
  // optional string contractId = 1;
  let $contractId = message.contractId;
  if ($contractId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $contractId);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string fullName = 3;
  let $fullName = message.fullName;
  if ($fullName !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $fullName);
  }

  // optional string thirdPartyId = 4;
  let $thirdPartyId = message.thirdPartyId;
  if ($thirdPartyId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $thirdPartyId);
  }

  // optional string unifiedSymbol = 7;
  let $unifiedSymbol = message.unifiedSymbol;
  if ($unifiedSymbol !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $unifiedSymbol);
  }

  // optional string symbol = 8;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $symbol);
  }

  // optional ExchangeEnum exchange = 9;
  let $exchange = message.exchange;
  if ($exchange !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeExchangeEnum($exchange, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ProductClassEnum productClass = 10;
  let $productClass = message.productClass;
  if ($productClass !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeProductClassEnum($productClass, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CurrencyEnum currency = 11;
  let $currency = message.currency;
  if ($currency !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeCurrencyEnum($currency, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double multiplier = 12;
  let $multiplier = message.multiplier;
  if ($multiplier !== undefined) {
    writeVarint32(bb, 97);
    writeDouble(bb, $multiplier);
  }

  // optional double priceTick = 13;
  let $priceTick = message.priceTick;
  if ($priceTick !== undefined) {
    writeVarint32(bb, 105);
    writeDouble(bb, $priceTick);
  }

  // optional double longMarginRatio = 14;
  let $longMarginRatio = message.longMarginRatio;
  if ($longMarginRatio !== undefined) {
    writeVarint32(bb, 113);
    writeDouble(bb, $longMarginRatio);
  }

  // optional double shortMarginRatio = 15;
  let $shortMarginRatio = message.shortMarginRatio;
  if ($shortMarginRatio !== undefined) {
    writeVarint32(bb, 121);
    writeDouble(bb, $shortMarginRatio);
  }

  // optional bool maxMarginSideAlgorithm = 16;
  let $maxMarginSideAlgorithm = message.maxMarginSideAlgorithm;
  if ($maxMarginSideAlgorithm !== undefined) {
    writeVarint32(bb, 128);
    writeByte(bb, $maxMarginSideAlgorithm ? 1 : 0);
  }

  // optional string underlyingSymbol = 17;
  let $underlyingSymbol = message.underlyingSymbol;
  if ($underlyingSymbol !== undefined) {
    writeVarint32(bb, 138);
    writeString(bb, $underlyingSymbol);
  }

  // optional double strikePrice = 18;
  let $strikePrice = message.strikePrice;
  if ($strikePrice !== undefined) {
    writeVarint32(bb, 145);
    writeDouble(bb, $strikePrice);
  }

  // optional OptionsTypeEnum optionsType = 19;
  let $optionsType = message.optionsType;
  if ($optionsType !== undefined) {
    writeVarint32(bb, 154);
    let nested = popByteBuffer();
    _encodeOptionsTypeEnum($optionsType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double underlyingMultiplier = 20;
  let $underlyingMultiplier = message.underlyingMultiplier;
  if ($underlyingMultiplier !== undefined) {
    writeVarint32(bb, 161);
    writeDouble(bb, $underlyingMultiplier);
  }

  // optional string lastTradeDateOrContractMonth = 21;
  let $lastTradeDateOrContractMonth = message.lastTradeDateOrContractMonth;
  if ($lastTradeDateOrContractMonth !== undefined) {
    writeVarint32(bb, 170);
    writeString(bb, $lastTradeDateOrContractMonth);
  }

  // optional fixed32 maxMarketOrderVolume = 22;
  let $maxMarketOrderVolume = message.maxMarketOrderVolume;
  if ($maxMarketOrderVolume !== undefined) {
    writeVarint32(bb, 181);
    writeInt32(bb, $maxMarketOrderVolume);
  }

  // optional fixed32 minMarketOrderVolume = 23;
  let $minMarketOrderVolume = message.minMarketOrderVolume;
  if ($minMarketOrderVolume !== undefined) {
    writeVarint32(bb, 189);
    writeInt32(bb, $minMarketOrderVolume);
  }

  // optional fixed32 maxLimitOrderVolume = 24;
  let $maxLimitOrderVolume = message.maxLimitOrderVolume;
  if ($maxLimitOrderVolume !== undefined) {
    writeVarint32(bb, 197);
    writeInt32(bb, $maxLimitOrderVolume);
  }

  // optional fixed32 minLimitOrderVolume = 25;
  let $minLimitOrderVolume = message.minLimitOrderVolume;
  if ($minLimitOrderVolume !== undefined) {
    writeVarint32(bb, 205);
    writeInt32(bb, $minLimitOrderVolume);
  }

  // optional CombinationTypeEnum combinationType = 26;
  let $combinationType = message.combinationType;
  if ($combinationType !== undefined) {
    writeVarint32(bb, 210);
    let nested = popByteBuffer();
    _encodeCombinationTypeEnum($combinationType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gatewayId = 27;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 218);
    writeString(bb, $gatewayId);
  }

  // optional double commissionFee = 28;
  let $commissionFee = message.commissionFee;
  if ($commissionFee !== undefined) {
    writeVarint32(bb, 225);
    writeDouble(bb, $commissionFee);
  }

  // optional double commissionRate = 29;
  let $commissionRate = message.commissionRate;
  if ($commissionRate !== undefined) {
    writeVarint32(bb, 233);
    writeDouble(bb, $commissionRate);
  }

  // optional string channelType = 30;
  let $channelType = message.channelType;
  if ($channelType !== undefined) {
    writeVarint32(bb, 242);
    writeString(bb, $channelType);
  }

  // optional sint32 pricePrecision = 31;
  let $pricePrecision = message.pricePrecision;
  if ($pricePrecision !== undefined) {
    writeVarint32(bb, 248);
    writeVarint32ZigZag(bb, $pricePrecision);
  }

  // optional sint32 quantityPrecision = 32;
  let $quantityPrecision = message.quantityPrecision;
  if ($quantityPrecision !== undefined) {
    writeVarint32(bb, 256);
    writeVarint32ZigZag(bb, $quantityPrecision);
  }
}

export function decodeContractField(binary) {
  return _decodeContractField(wrapByteBuffer(binary));
}

function _decodeContractField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string contractId = 1;
      case 1: {
        message.contractId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string fullName = 3;
      case 3: {
        message.fullName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string thirdPartyId = 4;
      case 4: {
        message.thirdPartyId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string unifiedSymbol = 7;
      case 7: {
        message.unifiedSymbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional string symbol = 8;
      case 8: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional ExchangeEnum exchange = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.exchange = _decodeExchangeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional ProductClassEnum productClass = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.productClass = _decodeProductClassEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional CurrencyEnum currency = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.currency = _decodeCurrencyEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double multiplier = 12;
      case 12: {
        message.multiplier = readDouble(bb);
        break;
      }

      // optional double priceTick = 13;
      case 13: {
        message.priceTick = readDouble(bb);
        break;
      }

      // optional double longMarginRatio = 14;
      case 14: {
        message.longMarginRatio = readDouble(bb);
        break;
      }

      // optional double shortMarginRatio = 15;
      case 15: {
        message.shortMarginRatio = readDouble(bb);
        break;
      }

      // optional bool maxMarginSideAlgorithm = 16;
      case 16: {
        message.maxMarginSideAlgorithm = !!readByte(bb);
        break;
      }

      // optional string underlyingSymbol = 17;
      case 17: {
        message.underlyingSymbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional double strikePrice = 18;
      case 18: {
        message.strikePrice = readDouble(bb);
        break;
      }

      // optional OptionsTypeEnum optionsType = 19;
      case 19: {
        let limit = pushTemporaryLength(bb);
        message.optionsType = _decodeOptionsTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double underlyingMultiplier = 20;
      case 20: {
        message.underlyingMultiplier = readDouble(bb);
        break;
      }

      // optional string lastTradeDateOrContractMonth = 21;
      case 21: {
        message.lastTradeDateOrContractMonth = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 maxMarketOrderVolume = 22;
      case 22: {
        message.maxMarketOrderVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 minMarketOrderVolume = 23;
      case 23: {
        message.minMarketOrderVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 maxLimitOrderVolume = 24;
      case 24: {
        message.maxLimitOrderVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 minLimitOrderVolume = 25;
      case 25: {
        message.minLimitOrderVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional CombinationTypeEnum combinationType = 26;
      case 26: {
        let limit = pushTemporaryLength(bb);
        message.combinationType = _decodeCombinationTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional string gatewayId = 27;
      case 27: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional double commissionFee = 28;
      case 28: {
        message.commissionFee = readDouble(bb);
        break;
      }

      // optional double commissionRate = 29;
      case 29: {
        message.commissionRate = readDouble(bb);
        break;
      }

      // optional string channelType = 30;
      case 30: {
        message.channelType = readString(bb, readVarint32(bb));
        break;
      }

      // optional sint32 pricePrecision = 31;
      case 31: {
        message.pricePrecision = readVarint32ZigZag(bb);
        break;
      }

      // optional sint32 quantityPrecision = 32;
      case 32: {
        message.quantityPrecision = readVarint32ZigZag(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeAccountField(message) {
  let bb = popByteBuffer();
  _encodeAccountField(message, bb);
  return toUint8Array(bb);
}

function _encodeAccountField(message, bb) {
  // optional string accountId = 1;
  let $accountId = message.accountId;
  if ($accountId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $accountId);
  }

  // optional string code = 2;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $code);
  }

  // optional string name = 3;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $name);
  }

  // optional string holder = 4;
  let $holder = message.holder;
  if ($holder !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $holder);
  }

  // optional CurrencyEnum currency = 5;
  let $currency = message.currency;
  if ($currency !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeCurrencyEnum($currency, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double preBalance = 6;
  let $preBalance = message.preBalance;
  if ($preBalance !== undefined) {
    writeVarint32(bb, 49);
    writeDouble(bb, $preBalance);
  }

  // optional double balance = 7;
  let $balance = message.balance;
  if ($balance !== undefined) {
    writeVarint32(bb, 57);
    writeDouble(bb, $balance);
  }

  // optional double available = 8;
  let $available = message.available;
  if ($available !== undefined) {
    writeVarint32(bb, 65);
    writeDouble(bb, $available);
  }

  // optional double commission = 9;
  let $commission = message.commission;
  if ($commission !== undefined) {
    writeVarint32(bb, 73);
    writeDouble(bb, $commission);
  }

  // optional double margin = 10;
  let $margin = message.margin;
  if ($margin !== undefined) {
    writeVarint32(bb, 81);
    writeDouble(bb, $margin);
  }

  // optional double closeProfit = 11;
  let $closeProfit = message.closeProfit;
  if ($closeProfit !== undefined) {
    writeVarint32(bb, 89);
    writeDouble(bb, $closeProfit);
  }

  // optional double positionProfit = 12;
  let $positionProfit = message.positionProfit;
  if ($positionProfit !== undefined) {
    writeVarint32(bb, 97);
    writeDouble(bb, $positionProfit);
  }

  // optional double deposit = 13;
  let $deposit = message.deposit;
  if ($deposit !== undefined) {
    writeVarint32(bb, 105);
    writeDouble(bb, $deposit);
  }

  // optional double withdraw = 14;
  let $withdraw = message.withdraw;
  if ($withdraw !== undefined) {
    writeVarint32(bb, 113);
    writeDouble(bb, $withdraw);
  }

  // optional string gatewayId = 15;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $gatewayId);
  }
}

export function decodeAccountField(binary) {
  return _decodeAccountField(wrapByteBuffer(binary));
}

function _decodeAccountField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string accountId = 1;
      case 1: {
        message.accountId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string code = 2;
      case 2: {
        message.code = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 3;
      case 3: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string holder = 4;
      case 4: {
        message.holder = readString(bb, readVarint32(bb));
        break;
      }

      // optional CurrencyEnum currency = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.currency = _decodeCurrencyEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double preBalance = 6;
      case 6: {
        message.preBalance = readDouble(bb);
        break;
      }

      // optional double balance = 7;
      case 7: {
        message.balance = readDouble(bb);
        break;
      }

      // optional double available = 8;
      case 8: {
        message.available = readDouble(bb);
        break;
      }

      // optional double commission = 9;
      case 9: {
        message.commission = readDouble(bb);
        break;
      }

      // optional double margin = 10;
      case 10: {
        message.margin = readDouble(bb);
        break;
      }

      // optional double closeProfit = 11;
      case 11: {
        message.closeProfit = readDouble(bb);
        break;
      }

      // optional double positionProfit = 12;
      case 12: {
        message.positionProfit = readDouble(bb);
        break;
      }

      // optional double deposit = 13;
      case 13: {
        message.deposit = readDouble(bb);
        break;
      }

      // optional double withdraw = 14;
      case 14: {
        message.withdraw = readDouble(bb);
        break;
      }

      // optional string gatewayId = 15;
      case 15: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeOrderField(message) {
  let bb = popByteBuffer();
  _encodeOrderField(message, bb);
  return toUint8Array(bb);
}

function _encodeOrderField(message, bb) {
  // optional string originOrderId = 1;
  let $originOrderId = message.originOrderId;
  if ($originOrderId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $originOrderId);
  }

  // optional string orderId = 2;
  let $orderId = message.orderId;
  if ($orderId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $orderId);
  }

  // optional string adapterOrderId = 3;
  let $adapterOrderId = message.adapterOrderId;
  if ($adapterOrderId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $adapterOrderId);
  }

  // optional string accountId = 4;
  let $accountId = message.accountId;
  if ($accountId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $accountId);
  }

  // optional string orderLocalId = 5;
  let $orderLocalId = message.orderLocalId;
  if ($orderLocalId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $orderLocalId);
  }

  // optional string brokerOrderSeq = 6;
  let $brokerOrderSeq = message.brokerOrderSeq;
  if ($brokerOrderSeq !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $brokerOrderSeq);
  }

  // optional string orderSysId = 7;
  let $orderSysId = message.orderSysId;
  if ($orderSysId !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $orderSysId);
  }

  // optional string sequenceNo = 8;
  let $sequenceNo = message.sequenceNo;
  if ($sequenceNo !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $sequenceNo);
  }

  // optional DirectionEnum direction = 9;
  let $direction = message.direction;
  if ($direction !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeDirectionEnum($direction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OffsetFlagEnum offsetFlag = 10;
  let $offsetFlag = message.offsetFlag;
  if ($offsetFlag !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeOffsetFlagEnum($offsetFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HedgeFlagEnum hedgeFlag = 11;
  let $hedgeFlag = message.hedgeFlag;
  if ($hedgeFlag !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeHedgeFlagEnum($hedgeFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OrderPriceTypeEnum orderPriceType = 12;
  let $orderPriceType = message.orderPriceType;
  if ($orderPriceType !== undefined) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeOrderPriceTypeEnum($orderPriceType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OrderStatusEnum orderStatus = 13;
  let $orderStatus = message.orderStatus;
  if ($orderStatus !== undefined) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeOrderStatusEnum($orderStatus, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double price = 14;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 113);
    writeDouble(bb, $price);
  }

  // optional fixed32 totalVolume = 15;
  let $totalVolume = message.totalVolume;
  if ($totalVolume !== undefined) {
    writeVarint32(bb, 125);
    writeInt32(bb, $totalVolume);
  }

  // optional fixed32 tradedVolume = 16;
  let $tradedVolume = message.tradedVolume;
  if ($tradedVolume !== undefined) {
    writeVarint32(bb, 133);
    writeInt32(bb, $tradedVolume);
  }

  // optional TimeConditionEnum timeCondition = 17;
  let $timeCondition = message.timeCondition;
  if ($timeCondition !== undefined) {
    writeVarint32(bb, 138);
    let nested = popByteBuffer();
    _encodeTimeConditionEnum($timeCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gtdDate = 18;
  let $gtdDate = message.gtdDate;
  if ($gtdDate !== undefined) {
    writeVarint32(bb, 146);
    writeString(bb, $gtdDate);
  }

  // optional VolumeConditionEnum volumeCondition = 19;
  let $volumeCondition = message.volumeCondition;
  if ($volumeCondition !== undefined) {
    writeVarint32(bb, 154);
    let nested = popByteBuffer();
    _encodeVolumeConditionEnum($volumeCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed32 minVolume = 20;
  let $minVolume = message.minVolume;
  if ($minVolume !== undefined) {
    writeVarint32(bb, 165);
    writeInt32(bb, $minVolume);
  }

  // optional ContingentConditionEnum contingentCondition = 21;
  let $contingentCondition = message.contingentCondition;
  if ($contingentCondition !== undefined) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeContingentConditionEnum($contingentCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double stopPrice = 22;
  let $stopPrice = message.stopPrice;
  if ($stopPrice !== undefined) {
    writeVarint32(bb, 177);
    writeDouble(bb, $stopPrice);
  }

  // optional ForceCloseReasonEnum forceCloseReason = 23;
  let $forceCloseReason = message.forceCloseReason;
  if ($forceCloseReason !== undefined) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeForceCloseReasonEnum($forceCloseReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed32 autoSuspend = 24;
  let $autoSuspend = message.autoSuspend;
  if ($autoSuspend !== undefined) {
    writeVarint32(bb, 197);
    writeInt32(bb, $autoSuspend);
  }

  // optional fixed32 userForceClose = 25;
  let $userForceClose = message.userForceClose;
  if ($userForceClose !== undefined) {
    writeVarint32(bb, 205);
    writeInt32(bb, $userForceClose);
  }

  // optional fixed32 swapOrder = 26;
  let $swapOrder = message.swapOrder;
  if ($swapOrder !== undefined) {
    writeVarint32(bb, 213);
    writeInt32(bb, $swapOrder);
  }

  // optional string tradingDay = 27;
  let $tradingDay = message.tradingDay;
  if ($tradingDay !== undefined) {
    writeVarint32(bb, 218);
    writeString(bb, $tradingDay);
  }

  // optional string orderDate = 28;
  let $orderDate = message.orderDate;
  if ($orderDate !== undefined) {
    writeVarint32(bb, 226);
    writeString(bb, $orderDate);
  }

  // optional string orderTime = 29;
  let $orderTime = message.orderTime;
  if ($orderTime !== undefined) {
    writeVarint32(bb, 234);
    writeString(bb, $orderTime);
  }

  // optional string activeTime = 30;
  let $activeTime = message.activeTime;
  if ($activeTime !== undefined) {
    writeVarint32(bb, 242);
    writeString(bb, $activeTime);
  }

  // optional string suspendTime = 31;
  let $suspendTime = message.suspendTime;
  if ($suspendTime !== undefined) {
    writeVarint32(bb, 250);
    writeString(bb, $suspendTime);
  }

  // optional string cancelTime = 32;
  let $cancelTime = message.cancelTime;
  if ($cancelTime !== undefined) {
    writeVarint32(bb, 258);
    writeString(bb, $cancelTime);
  }

  // optional string updateTime = 33;
  let $updateTime = message.updateTime;
  if ($updateTime !== undefined) {
    writeVarint32(bb, 266);
    writeString(bb, $updateTime);
  }

  // optional string statusMsg = 34;
  let $statusMsg = message.statusMsg;
  if ($statusMsg !== undefined) {
    writeVarint32(bb, 274);
    writeString(bb, $statusMsg);
  }

  // optional fixed32 frontId = 35;
  let $frontId = message.frontId;
  if ($frontId !== undefined) {
    writeVarint32(bb, 285);
    writeInt32(bb, $frontId);
  }

  // optional fixed32 sessionId = 36;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 293);
    writeInt32(bb, $sessionId);
  }

  // optional ContractField contract = 37;
  let $contract = message.contract;
  if ($contract !== undefined) {
    writeVarint32(bb, 298);
    let nested = popByteBuffer();
    _encodeContractField($contract, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gatewayId = 38;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 306);
    writeString(bb, $gatewayId);
  }
}

export function decodeOrderField(binary) {
  return _decodeOrderField(wrapByteBuffer(binary));
}

function _decodeOrderField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string originOrderId = 1;
      case 1: {
        message.originOrderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderId = 2;
      case 2: {
        message.orderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string adapterOrderId = 3;
      case 3: {
        message.adapterOrderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string accountId = 4;
      case 4: {
        message.accountId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderLocalId = 5;
      case 5: {
        message.orderLocalId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string brokerOrderSeq = 6;
      case 6: {
        message.brokerOrderSeq = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderSysId = 7;
      case 7: {
        message.orderSysId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sequenceNo = 8;
      case 8: {
        message.sequenceNo = readString(bb, readVarint32(bb));
        break;
      }

      // optional DirectionEnum direction = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.direction = _decodeDirectionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional OffsetFlagEnum offsetFlag = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.offsetFlag = _decodeOffsetFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional HedgeFlagEnum hedgeFlag = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.hedgeFlag = _decodeHedgeFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional OrderPriceTypeEnum orderPriceType = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.orderPriceType = _decodeOrderPriceTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional OrderStatusEnum orderStatus = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.orderStatus = _decodeOrderStatusEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double price = 14;
      case 14: {
        message.price = readDouble(bb);
        break;
      }

      // optional fixed32 totalVolume = 15;
      case 15: {
        message.totalVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 tradedVolume = 16;
      case 16: {
        message.tradedVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional TimeConditionEnum timeCondition = 17;
      case 17: {
        let limit = pushTemporaryLength(bb);
        message.timeCondition = _decodeTimeConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional string gtdDate = 18;
      case 18: {
        message.gtdDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional VolumeConditionEnum volumeCondition = 19;
      case 19: {
        let limit = pushTemporaryLength(bb);
        message.volumeCondition = _decodeVolumeConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed32 minVolume = 20;
      case 20: {
        message.minVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional ContingentConditionEnum contingentCondition = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.contingentCondition = _decodeContingentConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double stopPrice = 22;
      case 22: {
        message.stopPrice = readDouble(bb);
        break;
      }

      // optional ForceCloseReasonEnum forceCloseReason = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.forceCloseReason = _decodeForceCloseReasonEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed32 autoSuspend = 24;
      case 24: {
        message.autoSuspend = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 userForceClose = 25;
      case 25: {
        message.userForceClose = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 swapOrder = 26;
      case 26: {
        message.swapOrder = readInt32(bb) >>> 0;
        break;
      }

      // optional string tradingDay = 27;
      case 27: {
        message.tradingDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderDate = 28;
      case 28: {
        message.orderDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderTime = 29;
      case 29: {
        message.orderTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string activeTime = 30;
      case 30: {
        message.activeTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string suspendTime = 31;
      case 31: {
        message.suspendTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string cancelTime = 32;
      case 32: {
        message.cancelTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string updateTime = 33;
      case 33: {
        message.updateTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string statusMsg = 34;
      case 34: {
        message.statusMsg = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 frontId = 35;
      case 35: {
        message.frontId = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 sessionId = 36;
      case 36: {
        message.sessionId = readInt32(bb) >>> 0;
        break;
      }

      // optional ContractField contract = 37;
      case 37: {
        let limit = pushTemporaryLength(bb);
        message.contract = _decodeContractField(bb);
        bb.limit = limit;
        break;
      }

      // optional string gatewayId = 38;
      case 38: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeTradeField(message) {
  let bb = popByteBuffer();
  _encodeTradeField(message, bb);
  return toUint8Array(bb);
}

function _encodeTradeField(message, bb) {
  // optional string tradeId = 1;
  let $tradeId = message.tradeId;
  if ($tradeId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $tradeId);
  }

  // optional string adapterTradeId = 2;
  let $adapterTradeId = message.adapterTradeId;
  if ($adapterTradeId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $adapterTradeId);
  }

  // optional string originOrderId = 3;
  let $originOrderId = message.originOrderId;
  if ($originOrderId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $originOrderId);
  }

  // optional string orderId = 4;
  let $orderId = message.orderId;
  if ($orderId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $orderId);
  }

  // optional string adapterOrderId = 5;
  let $adapterOrderId = message.adapterOrderId;
  if ($adapterOrderId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $adapterOrderId);
  }

  // optional string orderLocalId = 6;
  let $orderLocalId = message.orderLocalId;
  if ($orderLocalId !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $orderLocalId);
  }

  // optional string brokerOrderSeq = 7;
  let $brokerOrderSeq = message.brokerOrderSeq;
  if ($brokerOrderSeq !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $brokerOrderSeq);
  }

  // optional string orderSysId = 8;
  let $orderSysId = message.orderSysId;
  if ($orderSysId !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $orderSysId);
  }

  // optional string settlementId = 9;
  let $settlementId = message.settlementId;
  if ($settlementId !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $settlementId);
  }

  // optional string sequenceNo = 10;
  let $sequenceNo = message.sequenceNo;
  if ($sequenceNo !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $sequenceNo);
  }

  // optional string accountId = 11;
  let $accountId = message.accountId;
  if ($accountId !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $accountId);
  }

  // optional DirectionEnum direction = 12;
  let $direction = message.direction;
  if ($direction !== undefined) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeDirectionEnum($direction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OffsetFlagEnum offsetFlag = 13;
  let $offsetFlag = message.offsetFlag;
  if ($offsetFlag !== undefined) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeOffsetFlagEnum($offsetFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HedgeFlagEnum hedgeFlag = 14;
  let $hedgeFlag = message.hedgeFlag;
  if ($hedgeFlag !== undefined) {
    writeVarint32(bb, 114);
    let nested = popByteBuffer();
    _encodeHedgeFlagEnum($hedgeFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double price = 15;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 121);
    writeDouble(bb, $price);
  }

  // optional fixed32 volume = 16;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 133);
    writeInt32(bb, $volume);
  }

  // optional TradeTypeEnum tradeType = 17;
  let $tradeType = message.tradeType;
  if ($tradeType !== undefined) {
    writeVarint32(bb, 138);
    let nested = popByteBuffer();
    _encodeTradeTypeEnum($tradeType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PriceSourceEnum priceSource = 18;
  let $priceSource = message.priceSource;
  if ($priceSource !== undefined) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodePriceSourceEnum($priceSource, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string tradingDay = 19;
  let $tradingDay = message.tradingDay;
  if ($tradingDay !== undefined) {
    writeVarint32(bb, 154);
    writeString(bb, $tradingDay);
  }

  // optional string tradeDate = 20;
  let $tradeDate = message.tradeDate;
  if ($tradeDate !== undefined) {
    writeVarint32(bb, 162);
    writeString(bb, $tradeDate);
  }

  // optional string tradeTime = 21;
  let $tradeTime = message.tradeTime;
  if ($tradeTime !== undefined) {
    writeVarint32(bb, 170);
    writeString(bb, $tradeTime);
  }

  // optional fixed64 tradeTimestamp = 22;
  let $tradeTimestamp = message.tradeTimestamp;
  if ($tradeTimestamp !== undefined) {
    writeVarint32(bb, 177);
    writeInt64(bb, $tradeTimestamp);
  }

  // optional ContractField contract = 23;
  let $contract = message.contract;
  if ($contract !== undefined) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeContractField($contract, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gatewayId = 24;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 194);
    writeString(bb, $gatewayId);
  }
}

export function decodeTradeField(binary) {
  return _decodeTradeField(wrapByteBuffer(binary));
}

function _decodeTradeField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string tradeId = 1;
      case 1: {
        message.tradeId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string adapterTradeId = 2;
      case 2: {
        message.adapterTradeId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string originOrderId = 3;
      case 3: {
        message.originOrderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderId = 4;
      case 4: {
        message.orderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string adapterOrderId = 5;
      case 5: {
        message.adapterOrderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderLocalId = 6;
      case 6: {
        message.orderLocalId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string brokerOrderSeq = 7;
      case 7: {
        message.brokerOrderSeq = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderSysId = 8;
      case 8: {
        message.orderSysId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string settlementId = 9;
      case 9: {
        message.settlementId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sequenceNo = 10;
      case 10: {
        message.sequenceNo = readString(bb, readVarint32(bb));
        break;
      }

      // optional string accountId = 11;
      case 11: {
        message.accountId = readString(bb, readVarint32(bb));
        break;
      }

      // optional DirectionEnum direction = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.direction = _decodeDirectionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional OffsetFlagEnum offsetFlag = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.offsetFlag = _decodeOffsetFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional HedgeFlagEnum hedgeFlag = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        message.hedgeFlag = _decodeHedgeFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double price = 15;
      case 15: {
        message.price = readDouble(bb);
        break;
      }

      // optional fixed32 volume = 16;
      case 16: {
        message.volume = readInt32(bb) >>> 0;
        break;
      }

      // optional TradeTypeEnum tradeType = 17;
      case 17: {
        let limit = pushTemporaryLength(bb);
        message.tradeType = _decodeTradeTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional PriceSourceEnum priceSource = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.priceSource = _decodePriceSourceEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional string tradingDay = 19;
      case 19: {
        message.tradingDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tradeDate = 20;
      case 20: {
        message.tradeDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tradeTime = 21;
      case 21: {
        message.tradeTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed64 tradeTimestamp = 22;
      case 22: {
        message.tradeTimestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional ContractField contract = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.contract = _decodeContractField(bb);
        bb.limit = limit;
        break;
      }

      // optional string gatewayId = 24;
      case 24: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodePositionField(message) {
  let bb = popByteBuffer();
  _encodePositionField(message, bb);
  return toUint8Array(bb);
}

function _encodePositionField(message, bb) {
  // optional string positionId = 1;
  let $positionId = message.positionId;
  if ($positionId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $positionId);
  }

  // optional string accountId = 2;
  let $accountId = message.accountId;
  if ($accountId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $accountId);
  }

  // optional PositionDirectionEnum positionDirection = 3;
  let $positionDirection = message.positionDirection;
  if ($positionDirection !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodePositionDirectionEnum($positionDirection, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed32 position = 4;
  let $position = message.position;
  if ($position !== undefined) {
    writeVarint32(bb, 37);
    writeInt32(bb, $position);
  }

  // optional fixed32 frozen = 5;
  let $frozen = message.frozen;
  if ($frozen !== undefined) {
    writeVarint32(bb, 45);
    writeInt32(bb, $frozen);
  }

  // optional fixed32 ydPosition = 6;
  let $ydPosition = message.ydPosition;
  if ($ydPosition !== undefined) {
    writeVarint32(bb, 53);
    writeInt32(bb, $ydPosition);
  }

  // optional fixed32 ydFrozen = 7;
  let $ydFrozen = message.ydFrozen;
  if ($ydFrozen !== undefined) {
    writeVarint32(bb, 61);
    writeInt32(bb, $ydFrozen);
  }

  // optional fixed32 tdPosition = 8;
  let $tdPosition = message.tdPosition;
  if ($tdPosition !== undefined) {
    writeVarint32(bb, 69);
    writeInt32(bb, $tdPosition);
  }

  // optional fixed32 tdFrozen = 9;
  let $tdFrozen = message.tdFrozen;
  if ($tdFrozen !== undefined) {
    writeVarint32(bb, 77);
    writeInt32(bb, $tdFrozen);
  }

  // optional double lastPrice = 10;
  let $lastPrice = message.lastPrice;
  if ($lastPrice !== undefined) {
    writeVarint32(bb, 81);
    writeDouble(bb, $lastPrice);
  }

  // optional double price = 11;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 89);
    writeDouble(bb, $price);
  }

  // optional double priceDiff = 12;
  let $priceDiff = message.priceDiff;
  if ($priceDiff !== undefined) {
    writeVarint32(bb, 97);
    writeDouble(bb, $priceDiff);
  }

  // optional double openPrice = 13;
  let $openPrice = message.openPrice;
  if ($openPrice !== undefined) {
    writeVarint32(bb, 105);
    writeDouble(bb, $openPrice);
  }

  // optional double openPriceDiff = 14;
  let $openPriceDiff = message.openPriceDiff;
  if ($openPriceDiff !== undefined) {
    writeVarint32(bb, 113);
    writeDouble(bb, $openPriceDiff);
  }

  // optional double positionProfit = 15;
  let $positionProfit = message.positionProfit;
  if ($positionProfit !== undefined) {
    writeVarint32(bb, 121);
    writeDouble(bb, $positionProfit);
  }

  // optional double positionProfitRatio = 16;
  let $positionProfitRatio = message.positionProfitRatio;
  if ($positionProfitRatio !== undefined) {
    writeVarint32(bb, 129);
    writeDouble(bb, $positionProfitRatio);
  }

  // optional double openPositionProfit = 17;
  let $openPositionProfit = message.openPositionProfit;
  if ($openPositionProfit !== undefined) {
    writeVarint32(bb, 137);
    writeDouble(bb, $openPositionProfit);
  }

  // optional double openPositionProfitRatio = 18;
  let $openPositionProfitRatio = message.openPositionProfitRatio;
  if ($openPositionProfitRatio !== undefined) {
    writeVarint32(bb, 145);
    writeDouble(bb, $openPositionProfitRatio);
  }

  // optional double useMargin = 19;
  let $useMargin = message.useMargin;
  if ($useMargin !== undefined) {
    writeVarint32(bb, 153);
    writeDouble(bb, $useMargin);
  }

  // optional double exchangeMargin = 20;
  let $exchangeMargin = message.exchangeMargin;
  if ($exchangeMargin !== undefined) {
    writeVarint32(bb, 161);
    writeDouble(bb, $exchangeMargin);
  }

  // optional double contractValue = 21;
  let $contractValue = message.contractValue;
  if ($contractValue !== undefined) {
    writeVarint32(bb, 169);
    writeDouble(bb, $contractValue);
  }

  // optional HedgeFlagEnum hedgeFlag = 22;
  let $hedgeFlag = message.hedgeFlag;
  if ($hedgeFlag !== undefined) {
    writeVarint32(bb, 178);
    let nested = popByteBuffer();
    _encodeHedgeFlagEnum($hedgeFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContractField contract = 23;
  let $contract = message.contract;
  if ($contract !== undefined) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeContractField($contract, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gatewayId = 24;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 194);
    writeString(bb, $gatewayId);
  }
}

export function decodePositionField(binary) {
  return _decodePositionField(wrapByteBuffer(binary));
}

function _decodePositionField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string positionId = 1;
      case 1: {
        message.positionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string accountId = 2;
      case 2: {
        message.accountId = readString(bb, readVarint32(bb));
        break;
      }

      // optional PositionDirectionEnum positionDirection = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.positionDirection = _decodePositionDirectionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed32 position = 4;
      case 4: {
        message.position = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 frozen = 5;
      case 5: {
        message.frozen = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 ydPosition = 6;
      case 6: {
        message.ydPosition = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 ydFrozen = 7;
      case 7: {
        message.ydFrozen = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 tdPosition = 8;
      case 8: {
        message.tdPosition = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 tdFrozen = 9;
      case 9: {
        message.tdFrozen = readInt32(bb) >>> 0;
        break;
      }

      // optional double lastPrice = 10;
      case 10: {
        message.lastPrice = readDouble(bb);
        break;
      }

      // optional double price = 11;
      case 11: {
        message.price = readDouble(bb);
        break;
      }

      // optional double priceDiff = 12;
      case 12: {
        message.priceDiff = readDouble(bb);
        break;
      }

      // optional double openPrice = 13;
      case 13: {
        message.openPrice = readDouble(bb);
        break;
      }

      // optional double openPriceDiff = 14;
      case 14: {
        message.openPriceDiff = readDouble(bb);
        break;
      }

      // optional double positionProfit = 15;
      case 15: {
        message.positionProfit = readDouble(bb);
        break;
      }

      // optional double positionProfitRatio = 16;
      case 16: {
        message.positionProfitRatio = readDouble(bb);
        break;
      }

      // optional double openPositionProfit = 17;
      case 17: {
        message.openPositionProfit = readDouble(bb);
        break;
      }

      // optional double openPositionProfitRatio = 18;
      case 18: {
        message.openPositionProfitRatio = readDouble(bb);
        break;
      }

      // optional double useMargin = 19;
      case 19: {
        message.useMargin = readDouble(bb);
        break;
      }

      // optional double exchangeMargin = 20;
      case 20: {
        message.exchangeMargin = readDouble(bb);
        break;
      }

      // optional double contractValue = 21;
      case 21: {
        message.contractValue = readDouble(bb);
        break;
      }

      // optional HedgeFlagEnum hedgeFlag = 22;
      case 22: {
        let limit = pushTemporaryLength(bb);
        message.hedgeFlag = _decodeHedgeFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional ContractField contract = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.contract = _decodeContractField(bb);
        bb.limit = limit;
        break;
      }

      // optional string gatewayId = 24;
      case 24: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeTickField(message) {
  let bb = popByteBuffer();
  _encodeTickField(message, bb);
  return toUint8Array(bb);
}

function _encodeTickField(message, bb) {
  // optional string unifiedSymbol = 1;
  let $unifiedSymbol = message.unifiedSymbol;
  if ($unifiedSymbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $unifiedSymbol);
  }

  // optional string gatewayId = 2;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gatewayId);
  }

  // optional string tradingDay = 3;
  let $tradingDay = message.tradingDay;
  if ($tradingDay !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $tradingDay);
  }

  // optional string actionDay = 4;
  let $actionDay = message.actionDay;
  if ($actionDay !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $actionDay);
  }

  // optional string actionTime = 5;
  let $actionTime = message.actionTime;
  if ($actionTime !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $actionTime);
  }

  // optional fixed64 actionTimestamp = 6;
  let $actionTimestamp = message.actionTimestamp;
  if ($actionTimestamp !== undefined) {
    writeVarint32(bb, 49);
    writeInt64(bb, $actionTimestamp);
  }

  // optional fixed32 status = 7;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 61);
    writeInt32(bb, $status);
  }

  // optional double lastPrice = 8;
  let $lastPrice = message.lastPrice;
  if ($lastPrice !== undefined) {
    writeVarint32(bb, 65);
    writeDouble(bb, $lastPrice);
  }

  // optional double avgPrice = 9;
  let $avgPrice = message.avgPrice;
  if ($avgPrice !== undefined) {
    writeVarint32(bb, 73);
    writeDouble(bb, $avgPrice);
  }

  // optional fixed64 totalBidVol = 10;
  let $totalBidVol = message.totalBidVol;
  if ($totalBidVol !== undefined) {
    writeVarint32(bb, 81);
    writeInt64(bb, $totalBidVol);
  }

  // optional fixed64 totalAskVol = 11;
  let $totalAskVol = message.totalAskVol;
  if ($totalAskVol !== undefined) {
    writeVarint32(bb, 89);
    writeInt64(bb, $totalAskVol);
  }

  // optional double weightedAvgBidPrice = 12;
  let $weightedAvgBidPrice = message.weightedAvgBidPrice;
  if ($weightedAvgBidPrice !== undefined) {
    writeVarint32(bb, 97);
    writeDouble(bb, $weightedAvgBidPrice);
  }

  // optional double weightedAvgAskPrice = 13;
  let $weightedAvgAskPrice = message.weightedAvgAskPrice;
  if ($weightedAvgAskPrice !== undefined) {
    writeVarint32(bb, 105);
    writeDouble(bb, $weightedAvgAskPrice);
  }

  // optional double iopv = 14;
  let $iopv = message.iopv;
  if ($iopv !== undefined) {
    writeVarint32(bb, 113);
    writeDouble(bb, $iopv);
  }

  // optional double yieldToMaturity = 15;
  let $yieldToMaturity = message.yieldToMaturity;
  if ($yieldToMaturity !== undefined) {
    writeVarint32(bb, 121);
    writeDouble(bb, $yieldToMaturity);
  }

  // optional fixed64 volumeDelta = 16;
  let $volumeDelta = message.volumeDelta;
  if ($volumeDelta !== undefined) {
    writeVarint32(bb, 129);
    writeInt64(bb, $volumeDelta);
  }

  // optional fixed64 volume = 17;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 137);
    writeInt64(bb, $volume);
  }

  // optional double turnover = 18;
  let $turnover = message.turnover;
  if ($turnover !== undefined) {
    writeVarint32(bb, 145);
    writeDouble(bb, $turnover);
  }

  // optional double turnoverDelta = 19;
  let $turnoverDelta = message.turnoverDelta;
  if ($turnoverDelta !== undefined) {
    writeVarint32(bb, 153);
    writeDouble(bb, $turnoverDelta);
  }

  // optional fixed64 numTrades = 20;
  let $numTrades = message.numTrades;
  if ($numTrades !== undefined) {
    writeVarint32(bb, 161);
    writeInt64(bb, $numTrades);
  }

  // optional fixed64 numTradesDelta = 21;
  let $numTradesDelta = message.numTradesDelta;
  if ($numTradesDelta !== undefined) {
    writeVarint32(bb, 169);
    writeInt64(bb, $numTradesDelta);
  }

  // optional double openInterest = 22;
  let $openInterest = message.openInterest;
  if ($openInterest !== undefined) {
    writeVarint32(bb, 177);
    writeDouble(bb, $openInterest);
  }

  // optional double openInterestDelta = 23;
  let $openInterestDelta = message.openInterestDelta;
  if ($openInterestDelta !== undefined) {
    writeVarint32(bb, 185);
    writeDouble(bb, $openInterestDelta);
  }

  // optional double preOpenInterest = 24;
  let $preOpenInterest = message.preOpenInterest;
  if ($preOpenInterest !== undefined) {
    writeVarint32(bb, 193);
    writeDouble(bb, $preOpenInterest);
  }

  // optional double preClosePrice = 25;
  let $preClosePrice = message.preClosePrice;
  if ($preClosePrice !== undefined) {
    writeVarint32(bb, 201);
    writeDouble(bb, $preClosePrice);
  }

  // optional double settlePrice = 26;
  let $settlePrice = message.settlePrice;
  if ($settlePrice !== undefined) {
    writeVarint32(bb, 209);
    writeDouble(bb, $settlePrice);
  }

  // optional double preSettlePrice = 27;
  let $preSettlePrice = message.preSettlePrice;
  if ($preSettlePrice !== undefined) {
    writeVarint32(bb, 217);
    writeDouble(bb, $preSettlePrice);
  }

  // optional double openPrice = 28;
  let $openPrice = message.openPrice;
  if ($openPrice !== undefined) {
    writeVarint32(bb, 225);
    writeDouble(bb, $openPrice);
  }

  // optional double highPrice = 29;
  let $highPrice = message.highPrice;
  if ($highPrice !== undefined) {
    writeVarint32(bb, 233);
    writeDouble(bb, $highPrice);
  }

  // optional double lowPrice = 30;
  let $lowPrice = message.lowPrice;
  if ($lowPrice !== undefined) {
    writeVarint32(bb, 241);
    writeDouble(bb, $lowPrice);
  }

  // optional double upperLimit = 31;
  let $upperLimit = message.upperLimit;
  if ($upperLimit !== undefined) {
    writeVarint32(bb, 249);
    writeDouble(bb, $upperLimit);
  }

  // optional double lowerLimit = 32;
  let $lowerLimit = message.lowerLimit;
  if ($lowerLimit !== undefined) {
    writeVarint32(bb, 257);
    writeDouble(bb, $lowerLimit);
  }

  // repeated double bidPrice = 33;
  let array$bidPrice = message.bidPrice;
  if (array$bidPrice !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$bidPrice) {
      writeDouble(packed, value);
    }
    writeVarint32(bb, 266);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated double askPrice = 34;
  let array$askPrice = message.askPrice;
  if (array$askPrice !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$askPrice) {
      writeDouble(packed, value);
    }
    writeVarint32(bb, 274);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated fixed32 bidVolume = 35;
  let array$bidVolume = message.bidVolume;
  if (array$bidVolume !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$bidVolume) {
      writeInt32(packed, value);
    }
    writeVarint32(bb, 282);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated fixed32 askVolume = 36;
  let array$askVolume = message.askVolume;
  if (array$askVolume !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$askVolume) {
      writeInt32(packed, value);
    }
    writeVarint32(bb, 290);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional string channelType = 37;
  let $channelType = message.channelType;
  if ($channelType !== undefined) {
    writeVarint32(bb, 298);
    writeString(bb, $channelType);
  }
}

export function decodeTickField(binary) {
  return _decodeTickField(wrapByteBuffer(binary));
}

function _decodeTickField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string unifiedSymbol = 1;
      case 1: {
        message.unifiedSymbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gatewayId = 2;
      case 2: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tradingDay = 3;
      case 3: {
        message.tradingDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string actionDay = 4;
      case 4: {
        message.actionDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string actionTime = 5;
      case 5: {
        message.actionTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed64 actionTimestamp = 6;
      case 6: {
        message.actionTimestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed32 status = 7;
      case 7: {
        message.status = readInt32(bb) >>> 0;
        break;
      }

      // optional double lastPrice = 8;
      case 8: {
        message.lastPrice = readDouble(bb);
        break;
      }

      // optional double avgPrice = 9;
      case 9: {
        message.avgPrice = readDouble(bb);
        break;
      }

      // optional fixed64 totalBidVol = 10;
      case 10: {
        message.totalBidVol = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed64 totalAskVol = 11;
      case 11: {
        message.totalAskVol = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double weightedAvgBidPrice = 12;
      case 12: {
        message.weightedAvgBidPrice = readDouble(bb);
        break;
      }

      // optional double weightedAvgAskPrice = 13;
      case 13: {
        message.weightedAvgAskPrice = readDouble(bb);
        break;
      }

      // optional double iopv = 14;
      case 14: {
        message.iopv = readDouble(bb);
        break;
      }

      // optional double yieldToMaturity = 15;
      case 15: {
        message.yieldToMaturity = readDouble(bb);
        break;
      }

      // optional fixed64 volumeDelta = 16;
      case 16: {
        message.volumeDelta = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed64 volume = 17;
      case 17: {
        message.volume = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double turnover = 18;
      case 18: {
        message.turnover = readDouble(bb);
        break;
      }

      // optional double turnoverDelta = 19;
      case 19: {
        message.turnoverDelta = readDouble(bb);
        break;
      }

      // optional fixed64 numTrades = 20;
      case 20: {
        message.numTrades = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed64 numTradesDelta = 21;
      case 21: {
        message.numTradesDelta = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double openInterest = 22;
      case 22: {
        message.openInterest = readDouble(bb);
        break;
      }

      // optional double openInterestDelta = 23;
      case 23: {
        message.openInterestDelta = readDouble(bb);
        break;
      }

      // optional double preOpenInterest = 24;
      case 24: {
        message.preOpenInterest = readDouble(bb);
        break;
      }

      // optional double preClosePrice = 25;
      case 25: {
        message.preClosePrice = readDouble(bb);
        break;
      }

      // optional double settlePrice = 26;
      case 26: {
        message.settlePrice = readDouble(bb);
        break;
      }

      // optional double preSettlePrice = 27;
      case 27: {
        message.preSettlePrice = readDouble(bb);
        break;
      }

      // optional double openPrice = 28;
      case 28: {
        message.openPrice = readDouble(bb);
        break;
      }

      // optional double highPrice = 29;
      case 29: {
        message.highPrice = readDouble(bb);
        break;
      }

      // optional double lowPrice = 30;
      case 30: {
        message.lowPrice = readDouble(bb);
        break;
      }

      // optional double upperLimit = 31;
      case 31: {
        message.upperLimit = readDouble(bb);
        break;
      }

      // optional double lowerLimit = 32;
      case 32: {
        message.lowerLimit = readDouble(bb);
        break;
      }

      // repeated double bidPrice = 33;
      case 33: {
        let values = message.bidPrice || (message.bidPrice = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readDouble(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readDouble(bb));
        }
        break;
      }

      // repeated double askPrice = 34;
      case 34: {
        let values = message.askPrice || (message.askPrice = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readDouble(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readDouble(bb));
        }
        break;
      }

      // repeated fixed32 bidVolume = 35;
      case 35: {
        let values = message.bidVolume || (message.bidVolume = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readInt32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readInt32(bb) >>> 0);
        }
        break;
      }

      // repeated fixed32 askVolume = 36;
      case 36: {
        let values = message.askVolume || (message.askVolume = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readInt32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readInt32(bb) >>> 0);
        }
        break;
      }

      // optional string channelType = 37;
      case 37: {
        message.channelType = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeBarField(message) {
  let bb = popByteBuffer();
  _encodeBarField(message, bb);
  return toUint8Array(bb);
}

function _encodeBarField(message, bb) {
  // optional string unifiedSymbol = 1;
  let $unifiedSymbol = message.unifiedSymbol;
  if ($unifiedSymbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $unifiedSymbol);
  }

  // optional string gatewayId = 2;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gatewayId);
  }

  // optional string tradingDay = 3;
  let $tradingDay = message.tradingDay;
  if ($tradingDay !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $tradingDay);
  }

  // optional string actionDay = 4;
  let $actionDay = message.actionDay;
  if ($actionDay !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $actionDay);
  }

  // optional string actionTime = 5;
  let $actionTime = message.actionTime;
  if ($actionTime !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $actionTime);
  }

  // optional fixed64 actionTimestamp = 6;
  let $actionTimestamp = message.actionTimestamp;
  if ($actionTimestamp !== undefined) {
    writeVarint32(bb, 49);
    writeInt64(bb, $actionTimestamp);
  }

  // optional double openPrice = 7;
  let $openPrice = message.openPrice;
  if ($openPrice !== undefined) {
    writeVarint32(bb, 57);
    writeDouble(bb, $openPrice);
  }

  // optional double highPrice = 8;
  let $highPrice = message.highPrice;
  if ($highPrice !== undefined) {
    writeVarint32(bb, 65);
    writeDouble(bb, $highPrice);
  }

  // optional double lowPrice = 9;
  let $lowPrice = message.lowPrice;
  if ($lowPrice !== undefined) {
    writeVarint32(bb, 73);
    writeDouble(bb, $lowPrice);
  }

  // optional double closePrice = 10;
  let $closePrice = message.closePrice;
  if ($closePrice !== undefined) {
    writeVarint32(bb, 81);
    writeDouble(bb, $closePrice);
  }

  // optional double openInterest = 11;
  let $openInterest = message.openInterest;
  if ($openInterest !== undefined) {
    writeVarint32(bb, 89);
    writeDouble(bb, $openInterest);
  }

  // optional double openInterestDelta = 12;
  let $openInterestDelta = message.openInterestDelta;
  if ($openInterestDelta !== undefined) {
    writeVarint32(bb, 97);
    writeDouble(bb, $openInterestDelta);
  }

  // optional fixed64 volume = 13;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 105);
    writeInt64(bb, $volume);
  }

  // optional fixed64 volumeDelta = 14;
  let $volumeDelta = message.volumeDelta;
  if ($volumeDelta !== undefined) {
    writeVarint32(bb, 113);
    writeInt64(bb, $volumeDelta);
  }

  // optional double turnover = 15;
  let $turnover = message.turnover;
  if ($turnover !== undefined) {
    writeVarint32(bb, 121);
    writeDouble(bb, $turnover);
  }

  // optional double turnoverDelta = 16;
  let $turnoverDelta = message.turnoverDelta;
  if ($turnoverDelta !== undefined) {
    writeVarint32(bb, 129);
    writeDouble(bb, $turnoverDelta);
  }

  // optional fixed64 numTrades = 17;
  let $numTrades = message.numTrades;
  if ($numTrades !== undefined) {
    writeVarint32(bb, 137);
    writeInt64(bb, $numTrades);
  }

  // optional fixed64 numTradesDelta = 18;
  let $numTradesDelta = message.numTradesDelta;
  if ($numTradesDelta !== undefined) {
    writeVarint32(bb, 145);
    writeInt64(bb, $numTradesDelta);
  }

  // optional double preOpenInterest = 19;
  let $preOpenInterest = message.preOpenInterest;
  if ($preOpenInterest !== undefined) {
    writeVarint32(bb, 153);
    writeDouble(bb, $preOpenInterest);
  }

  // optional double preClosePrice = 20;
  let $preClosePrice = message.preClosePrice;
  if ($preClosePrice !== undefined) {
    writeVarint32(bb, 161);
    writeDouble(bb, $preClosePrice);
  }

  // optional double preSettlePrice = 21;
  let $preSettlePrice = message.preSettlePrice;
  if ($preSettlePrice !== undefined) {
    writeVarint32(bb, 169);
    writeDouble(bb, $preSettlePrice);
  }

  // optional string channelType = 22;
  let $channelType = message.channelType;
  if ($channelType !== undefined) {
    writeVarint32(bb, 178);
    writeString(bb, $channelType);
  }
}

export function decodeBarField(binary) {
  return _decodeBarField(wrapByteBuffer(binary));
}

function _decodeBarField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string unifiedSymbol = 1;
      case 1: {
        message.unifiedSymbol = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gatewayId = 2;
      case 2: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tradingDay = 3;
      case 3: {
        message.tradingDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string actionDay = 4;
      case 4: {
        message.actionDay = readString(bb, readVarint32(bb));
        break;
      }

      // optional string actionTime = 5;
      case 5: {
        message.actionTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed64 actionTimestamp = 6;
      case 6: {
        message.actionTimestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double openPrice = 7;
      case 7: {
        message.openPrice = readDouble(bb);
        break;
      }

      // optional double highPrice = 8;
      case 8: {
        message.highPrice = readDouble(bb);
        break;
      }

      // optional double lowPrice = 9;
      case 9: {
        message.lowPrice = readDouble(bb);
        break;
      }

      // optional double closePrice = 10;
      case 10: {
        message.closePrice = readDouble(bb);
        break;
      }

      // optional double openInterest = 11;
      case 11: {
        message.openInterest = readDouble(bb);
        break;
      }

      // optional double openInterestDelta = 12;
      case 12: {
        message.openInterestDelta = readDouble(bb);
        break;
      }

      // optional fixed64 volume = 13;
      case 13: {
        message.volume = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed64 volumeDelta = 14;
      case 14: {
        message.volumeDelta = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double turnover = 15;
      case 15: {
        message.turnover = readDouble(bb);
        break;
      }

      // optional double turnoverDelta = 16;
      case 16: {
        message.turnoverDelta = readDouble(bb);
        break;
      }

      // optional fixed64 numTrades = 17;
      case 17: {
        message.numTrades = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional fixed64 numTradesDelta = 18;
      case 18: {
        message.numTradesDelta = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional double preOpenInterest = 19;
      case 19: {
        message.preOpenInterest = readDouble(bb);
        break;
      }

      // optional double preClosePrice = 20;
      case 20: {
        message.preClosePrice = readDouble(bb);
        break;
      }

      // optional double preSettlePrice = 21;
      case 21: {
        message.preSettlePrice = readDouble(bb);
        break;
      }

      // optional string channelType = 22;
      case 22: {
        message.channelType = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeCommonReqField(message) {
  let bb = popByteBuffer();
  _encodeCommonReqField(message, bb);
  return toUint8Array(bb);
}

function _encodeCommonReqField(message, bb) {
  // optional string reqId = 1;
  let $reqId = message.reqId;
  if ($reqId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $reqId);
  }

  // optional string operatorId = 2;
  let $operatorId = message.operatorId;
  if ($operatorId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $operatorId);
  }

  // optional fixed32 targetNodeId = 3;
  let $targetNodeId = message.targetNodeId;
  if ($targetNodeId !== undefined) {
    writeVarint32(bb, 29);
    writeInt32(bb, $targetNodeId);
  }

  // optional fixed32 sourceNodeId = 4;
  let $sourceNodeId = message.sourceNodeId;
  if ($sourceNodeId !== undefined) {
    writeVarint32(bb, 37);
    writeInt32(bb, $sourceNodeId);
  }
}

export function decodeCommonReqField(binary) {
  return _decodeCommonReqField(wrapByteBuffer(binary));
}

function _decodeCommonReqField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string reqId = 1;
      case 1: {
        message.reqId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string operatorId = 2;
      case 2: {
        message.operatorId = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 targetNodeId = 3;
      case 3: {
        message.targetNodeId = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 sourceNodeId = 4;
      case 4: {
        message.sourceNodeId = readInt32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeCommonRspField(message) {
  let bb = popByteBuffer();
  _encodeCommonRspField(message, bb);
  return toUint8Array(bb);
}

function _encodeCommonRspField(message, bb) {
  // optional string reqId = 1;
  let $reqId = message.reqId;
  if ($reqId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $reqId);
  }

  // optional fixed32 errorId = 2;
  let $errorId = message.errorId;
  if ($errorId !== undefined) {
    writeVarint32(bb, 21);
    writeInt32(bb, $errorId);
  }

  // optional string errorMsg = 3;
  let $errorMsg = message.errorMsg;
  if ($errorMsg !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $errorMsg);
  }
}

export function decodeCommonRspField(binary) {
  return _decodeCommonRspField(wrapByteBuffer(binary));
}

function _decodeCommonRspField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string reqId = 1;
      case 1: {
        message.reqId = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 errorId = 2;
      case 2: {
        message.errorId = readInt32(bb) >>> 0;
        break;
      }

      // optional string errorMsg = 3;
      case 3: {
        message.errorMsg = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeSubmitOrderReqField(message) {
  let bb = popByteBuffer();
  _encodeSubmitOrderReqField(message, bb);
  return toUint8Array(bb);
}

function _encodeSubmitOrderReqField(message, bb) {
  // optional string originOrderId = 1;
  let $originOrderId = message.originOrderId;
  if ($originOrderId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $originOrderId);
  }

  // optional string accountCode = 2;
  let $accountCode = message.accountCode;
  if ($accountCode !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $accountCode);
  }

  // optional CurrencyEnum currency = 3;
  let $currency = message.currency;
  if ($currency !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeCurrencyEnum($currency, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContractField contract = 4;
  let $contract = message.contract;
  if ($contract !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeContractField($contract, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gatewayId = 5;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $gatewayId);
  }

  // optional fixed32 volume = 6;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 53);
    writeInt32(bb, $volume);
  }

  // optional double price = 7;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 57);
    writeDouble(bb, $price);
  }

  // optional OrderPriceTypeEnum orderPriceType = 8;
  let $orderPriceType = message.orderPriceType;
  if ($orderPriceType !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeOrderPriceTypeEnum($orderPriceType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DirectionEnum direction = 9;
  let $direction = message.direction;
  if ($direction !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeDirectionEnum($direction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OffsetFlagEnum offsetFlag = 10;
  let $offsetFlag = message.offsetFlag;
  if ($offsetFlag !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeOffsetFlagEnum($offsetFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HedgeFlagEnum hedgeFlag = 11;
  let $hedgeFlag = message.hedgeFlag;
  if ($hedgeFlag !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeHedgeFlagEnum($hedgeFlag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TimeConditionEnum timeCondition = 12;
  let $timeCondition = message.timeCondition;
  if ($timeCondition !== undefined) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeTimeConditionEnum($timeCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string gtdDate = 13;
  let $gtdDate = message.gtdDate;
  if ($gtdDate !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $gtdDate);
  }

  // optional VolumeConditionEnum volumeCondition = 14;
  let $volumeCondition = message.volumeCondition;
  if ($volumeCondition !== undefined) {
    writeVarint32(bb, 114);
    let nested = popByteBuffer();
    _encodeVolumeConditionEnum($volumeCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed32 minVolume = 15;
  let $minVolume = message.minVolume;
  if ($minVolume !== undefined) {
    writeVarint32(bb, 125);
    writeInt32(bb, $minVolume);
  }

  // optional ContingentConditionEnum contingentCondition = 16;
  let $contingentCondition = message.contingentCondition;
  if ($contingentCondition !== undefined) {
    writeVarint32(bb, 130);
    let nested = popByteBuffer();
    _encodeContingentConditionEnum($contingentCondition, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional double stopPrice = 17;
  let $stopPrice = message.stopPrice;
  if ($stopPrice !== undefined) {
    writeVarint32(bb, 137);
    writeDouble(bb, $stopPrice);
  }

  // optional ForceCloseReasonEnum forceCloseReason = 18;
  let $forceCloseReason = message.forceCloseReason;
  if ($forceCloseReason !== undefined) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodeForceCloseReasonEnum($forceCloseReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed32 autoSuspend = 19;
  let $autoSuspend = message.autoSuspend;
  if ($autoSuspend !== undefined) {
    writeVarint32(bb, 157);
    writeInt32(bb, $autoSuspend);
  }

  // optional fixed32 userForceClose = 20;
  let $userForceClose = message.userForceClose;
  if ($userForceClose !== undefined) {
    writeVarint32(bb, 165);
    writeInt32(bb, $userForceClose);
  }

  // optional fixed32 swapOrder = 21;
  let $swapOrder = message.swapOrder;
  if ($swapOrder !== undefined) {
    writeVarint32(bb, 173);
    writeInt32(bb, $swapOrder);
  }

  // optional fixed64 actionTimestamp = 22;
  let $actionTimestamp = message.actionTimestamp;
  if ($actionTimestamp !== undefined) {
    writeVarint32(bb, 177);
    writeInt64(bb, $actionTimestamp);
  }
}

export function decodeSubmitOrderReqField(binary) {
  return _decodeSubmitOrderReqField(wrapByteBuffer(binary));
}

function _decodeSubmitOrderReqField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string originOrderId = 1;
      case 1: {
        message.originOrderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string accountCode = 2;
      case 2: {
        message.accountCode = readString(bb, readVarint32(bb));
        break;
      }

      // optional CurrencyEnum currency = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.currency = _decodeCurrencyEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional ContractField contract = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.contract = _decodeContractField(bb);
        bb.limit = limit;
        break;
      }

      // optional string gatewayId = 5;
      case 5: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 volume = 6;
      case 6: {
        message.volume = readInt32(bb) >>> 0;
        break;
      }

      // optional double price = 7;
      case 7: {
        message.price = readDouble(bb);
        break;
      }

      // optional OrderPriceTypeEnum orderPriceType = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.orderPriceType = _decodeOrderPriceTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional DirectionEnum direction = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.direction = _decodeDirectionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional OffsetFlagEnum offsetFlag = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.offsetFlag = _decodeOffsetFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional HedgeFlagEnum hedgeFlag = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.hedgeFlag = _decodeHedgeFlagEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional TimeConditionEnum timeCondition = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.timeCondition = _decodeTimeConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional string gtdDate = 13;
      case 13: {
        message.gtdDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional VolumeConditionEnum volumeCondition = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        message.volumeCondition = _decodeVolumeConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed32 minVolume = 15;
      case 15: {
        message.minVolume = readInt32(bb) >>> 0;
        break;
      }

      // optional ContingentConditionEnum contingentCondition = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        message.contingentCondition = _decodeContingentConditionEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional double stopPrice = 17;
      case 17: {
        message.stopPrice = readDouble(bb);
        break;
      }

      // optional ForceCloseReasonEnum forceCloseReason = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.forceCloseReason = _decodeForceCloseReasonEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed32 autoSuspend = 19;
      case 19: {
        message.autoSuspend = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 userForceClose = 20;
      case 20: {
        message.userForceClose = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 swapOrder = 21;
      case 21: {
        message.swapOrder = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed64 actionTimestamp = 22;
      case 22: {
        message.actionTimestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeCancelOrderReqField(message) {
  let bb = popByteBuffer();
  _encodeCancelOrderReqField(message, bb);
  return toUint8Array(bb);
}

function _encodeCancelOrderReqField(message, bb) {
  // optional string gatewayId = 1;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gatewayId);
  }

  // optional string orderId = 2;
  let $orderId = message.orderId;
  if ($orderId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $orderId);
  }

  // optional string originOrderId = 3;
  let $originOrderId = message.originOrderId;
  if ($originOrderId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $originOrderId);
  }
}

export function decodeCancelOrderReqField(binary) {
  return _decodeCancelOrderReqField(wrapByteBuffer(binary));
}

function _decodeCancelOrderReqField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gatewayId = 1;
      case 1: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string orderId = 2;
      case 2: {
        message.orderId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string originOrderId = 3;
      case 3: {
        message.originOrderId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeGatewaySettingField(message) {
  let bb = popByteBuffer();
  _encodeGatewaySettingField(message, bb);
  return toUint8Array(bb);
}

function _encodeGatewaySettingField(message, bb) {
  // optional string gatewayId = 1;
  let $gatewayId = message.gatewayId;
  if ($gatewayId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $gatewayId);
  }

  // optional string gatewayName = 2;
  let $gatewayName = message.gatewayName;
  if ($gatewayName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gatewayName);
  }

  // optional string gatewayDescription = 4;
  let $gatewayDescription = message.gatewayDescription;
  if ($gatewayDescription !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $gatewayDescription);
  }

  // optional string implementClassName = 5;
  let $implementClassName = message.implementClassName;
  if ($implementClassName !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $implementClassName);
  }

  // optional GatewayTypeEnum gatewayType = 6;
  let $gatewayType = message.gatewayType;
  if ($gatewayType !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeGatewayTypeEnum($gatewayType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GatewayAdapterTypeEnum gatewayAdapterType = 7;
  let $gatewayAdapterType = message.gatewayAdapterType;
  if ($gatewayAdapterType !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeGatewayAdapterTypeEnum($gatewayAdapterType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CtpApiSettingField ctpApiSetting = 8;
  let $ctpApiSetting = message.ctpApiSetting;
  if ($ctpApiSetting !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeCtpApiSettingField($ctpApiSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional IbApiSettingField ibApiSetting = 9;
  let $ibApiSetting = message.ibApiSetting;
  if ($ibApiSetting !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeIbApiSettingField($ibApiSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ConnectStatusEnum status = 10;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeConnectStatusEnum($status, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed64 version = 11;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 89);
    writeInt64(bb, $version);
  }

  // optional string autoConnectTimeRanges = 12;
  let $autoConnectTimeRanges = message.autoConnectTimeRanges;
  if ($autoConnectTimeRanges !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $autoConnectTimeRanges);
  }
}

export function decodeGatewaySettingField(binary) {
  return _decodeGatewaySettingField(wrapByteBuffer(binary));
}

function _decodeGatewaySettingField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string gatewayId = 1;
      case 1: {
        message.gatewayId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gatewayName = 2;
      case 2: {
        message.gatewayName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gatewayDescription = 4;
      case 4: {
        message.gatewayDescription = readString(bb, readVarint32(bb));
        break;
      }

      // optional string implementClassName = 5;
      case 5: {
        message.implementClassName = readString(bb, readVarint32(bb));
        break;
      }

      // optional GatewayTypeEnum gatewayType = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.gatewayType = _decodeGatewayTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional GatewayAdapterTypeEnum gatewayAdapterType = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.gatewayAdapterType = _decodeGatewayAdapterTypeEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional CtpApiSettingField ctpApiSetting = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.ctpApiSetting = _decodeCtpApiSettingField(bb);
        bb.limit = limit;
        break;
      }

      // optional IbApiSettingField ibApiSetting = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.ibApiSetting = _decodeIbApiSettingField(bb);
        bb.limit = limit;
        break;
      }

      // optional ConnectStatusEnum status = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.status = _decodeConnectStatusEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed64 version = 11;
      case 11: {
        message.version = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional string autoConnectTimeRanges = 12;
      case 12: {
        message.autoConnectTimeRanges = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeLogField(message) {
  let bb = popByteBuffer();
  _encodeLogField(message, bb);
  return toUint8Array(bb);
}

function _encodeLogField(message, bb) {
  // optional LogLevelEnum logLevel = 1;
  let $logLevel = message.logLevel;
  if ($logLevel !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeLogLevelEnum($logLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed64 timestamp = 2;
  let $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 17);
    writeInt64(bb, $timestamp);
  }

  // optional string content = 3;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $content);
  }
}

export function decodeLogField(binary) {
  return _decodeLogField(wrapByteBuffer(binary));
}

function _decodeLogField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional LogLevelEnum logLevel = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.logLevel = _decodeLogLevelEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed64 timestamp = 2;
      case 2: {
        message.timestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional string content = 3;
      case 3: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeNoticeField(message) {
  let bb = popByteBuffer();
  _encodeNoticeField(message, bb);
  return toUint8Array(bb);
}

function _encodeNoticeField(message, bb) {
  // optional CommonStatusEnum status = 1;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommonStatusEnum($status, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional fixed64 timestamp = 2;
  let $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 17);
    writeInt64(bb, $timestamp);
  }

  // optional string content = 3;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $content);
  }
}

export function decodeNoticeField(binary) {
  return _decodeNoticeField(wrapByteBuffer(binary));
}

function _decodeNoticeField(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional CommonStatusEnum status = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.status = _decodeCommonStatusEnum(bb);
        bb.limit = limit;
        break;
      }

      // optional fixed64 timestamp = 2;
      case 2: {
        message.timestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      // optional string content = 3;
      case 3: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
